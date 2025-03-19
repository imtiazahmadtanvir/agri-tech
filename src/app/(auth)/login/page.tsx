"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Replace with actual API call
    const response = { success: true };

    if (response.success) {
      toast.success("Login successful!");
      router.push("/");
    } else {
      toast.error("Invalid email or password.");
    }

    setLoading(false);
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            placeholder="john.doe@example.com"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4 relative">
          <label className="block font-semibold">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="********"
            className="w-full p-2 border rounded pr-10"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-10 right-3"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-500">
            Register
          </a>
        </p>
      </form>
    </section>
  );
};

export default Login;
