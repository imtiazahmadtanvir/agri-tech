"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "@/app/action/auth/registerUser";
import Link from "next/link";
import SocialLoginBtn from "@/components/shared/common-button/SocialLoginBtn";

const Register = () => {
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

    // Validate Gmail-only email
    if (!formData.email.includes("@gmail.com")) {
      toast.error("Please use a Gmail address");
      setLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    const data = await registerUser({
      email: formData.email,
      password: formData.password,
    });
    console.log(data);

    if (data.success) {
      toast.success("Registration successful! Please log in.");
      router.push("/login");
    } else {
      toast.error(data.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-lg my-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        🌾 Create an Account
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Gmail Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="john.doe@gmail.com"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4 relative">
          <label className="block font-semibold text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="********"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-10 right-3 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:bg-green-400"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

        <div className="mt-4">
          <SocialLoginBtn />
        </div>
      </form>
    </section>
  );
};

export default Register;
