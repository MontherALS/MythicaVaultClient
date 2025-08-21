"use client";
// Import hooks/tools/context
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserTokenCtx } from "../store/UserContext";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";

export default function loginPage() {
  const router = useRouter();
  const { setUserPayload } = useContext(UserTokenCtx);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.message);
      return;
    }

    if (res.ok) {
      // saving the JWT token indise localStorage
      localStorage.setItem("token", data.token);
      setUserPayload(jwtDecode(data.token));
      router.push("/");
    } else {
      setMessage(data.message);
      console.log(data.message);
    }
  };
  return (
    <div className="min-h-[50vh] flex items-baseline mt-16 justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[#121212] p-6 rounded-xl shadow-md border border-neutral-800"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 text-center">
          Log in
        </h1>

        {message && (
          <p className="text-red-500 bg-red-900/20 border border-red-700 rounded-md px-3 py-2 text-sm md:text-base mb-4 text-center">
            {message}
          </p>
        )}

        {/* Email */}
        <label className="block text-sm md:text-base text-gray-400 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          className="w-full mb-3 px-4 py-2 md:py-3 bg-[#1f1f1f] text-white rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-400 text-sm md:text-base"
        />

        {/* Password */}
        <label className="block text-sm md:text-base text-gray-400 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="••••••••"
          className="w-full mb-4 px-4 py-2 md:py-3 bg-[#1f1f1f] text-white rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-gray-400 text-sm md:text-base"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 md:py-3 
      text-base md:text-lg rounded-lg transition"
        >
          Log In
        </button>

        {/* Footer */}
        <p className="text-sm md:text-base text-gray-500 text-center mt-3">
          Dont have an account?{" "}
          <Link href="/Signup" className="text-purple-400 hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
