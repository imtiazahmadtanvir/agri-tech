"use client";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/forget-password", {
        email,
      });

      toast.success(res.data.message || "Reset link sent successfully.");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-lg my-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full text-white py-2 rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black"
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </section>
  );
}
