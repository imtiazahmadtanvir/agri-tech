"use client";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";

export default function ShareButtons() {
  return (
    <div className="flex items-center gap-3">
      <span className="font-medium">Share:</span>
      <div className="flex gap-2">
        <button
          onClick={() =>
            window.open(
              "https://www.facebook.com/sharer/sharer.php?u=" +
                window.location.href,
              "_blank"
            )
          }
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
        >
          <FaFacebookF size={16} />
        </button>
        <button
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?url=${window.location.href}`,
              "_blank"
            )
          }
          className="p-2 rounded-full bg-black text-white hover:bg-gray-800"
        >
          <FaXTwitter size={16} />
        </button>
      </div>
    </div>
  );
}
