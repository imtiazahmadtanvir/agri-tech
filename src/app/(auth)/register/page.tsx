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
    firstName: "",
    lastName: "",
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

    const data = await registerUser(formData);

    if (data.success) {
      toast.success("Registration successful!");
      router.push("/login");
    } else {
      toast.error("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-lg my-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="John"
            className="w-full p-2 border rounded"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Doe"
            className="w-full p-2 border rounded"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

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
          {loading ? "Signing up..." : "Sign up"}
        </button>

        <p className="mt-4 text-center mb-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
        <SocialLoginBtn />
      </form>
    </section>
  );
};

export default Register;
