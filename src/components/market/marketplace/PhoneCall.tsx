"use client";
import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";

export default function PhoneCall({ phoneNumber }: { phoneNumber?: string }) {
  const [isPhoneNumberVisible, setPhoneNumberVisible] = useState(false);

  const togglePhoneNumberVisibility = () => {
    setPhoneNumberVisible((prev) => !prev);
  };

  const displayPhoneNumber = isPhoneNumberVisible
    ? phoneNumber
    : `${phoneNumber?.slice(0, 5)}...`;

  return (
    <div className="py-3 flex gap-2 border-b px-3">
      <span className="bg-green-500 rounded-full flex justify-center items-center w-8 h-8">
        <FaPhoneAlt className="text-white " />
      </span>
      <div>
        {phoneNumber ? (
          <div>
            {isPhoneNumberVisible && (
              <h3 className="font-semibold ">Call seller</h3>
            )}
            <h3
              className={`${
                isPhoneNumberVisible
                  ? "bg-[#E7EDEE] p-1 rounded-sm font-bold"
                  : "font-medium"
              }`}
            >
              {displayPhoneNumber}
            </h3>
            {!isPhoneNumberVisible && (
              <button
                onClick={togglePhoneNumberVisibility}
                className="text-blue-500 text-sm ml-2"
              >
                Click here to show
              </button>
            )}
          </div>
        ) : (
          <h3 className="text-gray-500 text-sm">No phone number available</h3>
        )}
      </div>
    </div>
  );
}
