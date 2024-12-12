"use client";

import React, { useState, FormEvent } from "react";

const Home = () => {
  const [sin, setSin] = useState("");
  const [message, setMessage] = useState("");

  const validateSIN = (sin: string) => {
    if (!/^[0-9]{9}$/.test(sin)) {
      return "Invalid SIN. Please enter exactly 9 digits.";
    }

    const digits = sin.split("").map(Number);
    let sum = 0;
    let isSecond = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
      if (isSecond) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isSecond = !isSecond;
    }

    return sum % 10 === 0
      ? "Valid SIN"
      : "Invalid SIN. Failed checksum validation.";
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(validateSIN(sin));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">SIN Validation</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-lg w-full max-w-sm space-y-4"
      >
        <div>
          <label
            htmlFor="sin"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter your SIN (9 digits):
          </label>
          <input
            type="text"
            id="sin"
            name="sin"
            value={sin}
            onChange={(e) => setSin(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="123456789"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
      {message && (
        <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default Home;
