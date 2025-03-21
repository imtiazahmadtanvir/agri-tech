"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLoginBtn = () => {
  const handleSocialLogin = async (providerName: string) => {
    const callbackUrl =
      new URLSearchParams(window.location.search).get("callbackUrl") || "/";

    await signIn(providerName, { callbackUrl });
  };
  return (
    <div className="flex flex-col space-y-4">
      <button
        onClick={() => handleSocialLogin("github")}
        className="flex justify-center items-center space-x-3 p-2 w-full border rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        <FaGithub className="text-2xl" />
        <span className="font-medium">Continue with GitHub</span>
      </button>

      <button
        onClick={() => handleSocialLogin("google")}
        className="flex justify-center items-center space-x-3 p-2 w-full border rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        <FcGoogle className="text-2xl" />
        <span className="font-medium">Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLoginBtn;
