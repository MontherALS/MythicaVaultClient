"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resdata = await res.json();

    if (!res.ok || resdata.errmsg) {
      setError(resdata.errmsg || "Something went wrong");
      return;
    }

    router.push("/login");
  };

  return (
    <div className="min-h-[50vh] flex items-baseline mt-16 mb-8 justify-center px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-lg bg-[#121212] p-6 rounded-2xl shadow-md border border-neutral-800"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 text-center">
          Sign Up
        </h1>

        {error && (
          <p className="text-red-500 bg-red-900/20 border border-red-700 rounded-md px-4 py-2 text-sm md:text-base mb-4">
            {error}
          </p>
        )}

        <label className="block text-sm md:text-base text-gray-400 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 md:py-3 bg-[#1f1f1f] text-white rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm md:text-base placeholder-gray-400"
        />

        <label className="block text-sm md:text-base text-gray-400 mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          value={data.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 md:py-3 bg-[#1f1f1f] text-white rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm md:text-base placeholder-gray-400"
        />

        <label className="block text-sm md:text-base text-gray-400 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          value={data.confirmPassword}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 md:py-3 bg-[#1f1f1f] text-white rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm md:text-base placeholder-gray-400"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 md:py-3 
      text-base md:text-lg rounded-lg transition"
        >
          Create Account
        </button>

        <p className="text-sm md:text-base text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
