"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function RestPassword() {
  const { status } = useSession();
  const params = useParams();
  const token = params?.token as string;
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const {
    data,
    isLoading,
    error: tokenError,
  } = useQuery({
    queryKey: ["verify-token", token],
    queryFn: async () => {
      const res = await axios.post("/api/verify-token", { token });
      return res.data;
    },
    enabled: !!token,
    retry: false,
  });
  useEffect(() => {
    if (tokenError) {
      setError("Invalid or expired token.");
    }
  }, [tokenError]);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("/api/reset-password", {
        email: data?.data?.email,
        password,
      });
      if (res.data.success) {
        setMessage("Password updated successfully!");
        setError("");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Error updating password.");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Verifying token...</p>;

  return (
    <div className="max-w-md mx-auto my-20 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <button
          type="submit"
          disabled={!!error}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
