import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLoginBtn = () => {
  return (
    <div className="flex flex-col space-y-4">
      <button className="flex items-center space-x-3 p-2 w-full border rounded-lg bg-gray-100 hover:bg-gray-200 transition">
        <FaGithub className="text-2xl" />
        <span className="font-medium">Continue with GitHub</span>
      </button>

      <button className="flex items-center space-x-3 p-2 w-full border rounded-lg bg-gray-100 hover:bg-gray-200 transition">
        <FcGoogle className="text-2xl" />
        <span className="font-medium">Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLoginBtn;
