"use client";
import { FaFacebookF, FaXTwitter, FaWhatsapp } from "react-icons/fa6";

export default function ShareButtons() {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="flex items-center gap-3">
      <span className="font-medium">Share:</span>
      <div className="flex gap-2">
        {/* Facebook */}
        <button
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
              "_blank"
            )
          }
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
        >
          <FaFacebookF size={16} />
        </button>

        {/* Twitter/X */}
        <button
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?url=${currentUrl}`,
              "_blank"
            )
          }
          className="p-2 rounded-full bg-black text-white hover:bg-gray-800"
        >
          <FaXTwitter size={16} />
        </button>

        {/* WhatsApp */}
        <button
          onClick={() =>
            window.open(
              `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
              "_blank"
            )
          }
          className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
        >
          <FaWhatsapp size={16} />
        </button>
      </div>
    </div>
  );
}
