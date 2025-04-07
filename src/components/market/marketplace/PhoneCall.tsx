"use client";
import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";

export default function PhoneCall({ phoneNumber }: { phoneNumber: string }) {
  const [isPhoneNumberVisible, setPhoneNumberVisible] = useState(false);

  const togglePhoneNumberVisibility = () => {
    setPhoneNumberVisible((prev) => !prev);
  };

  const displayPhoneNumber = isPhoneNumberVisible
    ? phoneNumber
    : `${phoneNumber.slice(0, 5)}...`;

  return (
    <div className="py-3 flex  gap-2 border-b px-3">
      <span className="size-7  bg-green-500 rounded-full flex justify-center items-center">
        {" "}
        <FaPhoneAlt className="text-white " />
      </span>
      <div>
        <div>
          {isPhoneNumberVisible && (
            <>
              <h3 className="font-bold">Call seller</h3>
            </>
          )}
          <h3
            className={`${
              isPhoneNumberVisible
                ? "bg-[#E7EDEE] p-1 rounded-sm font-bold"
                : ""
            }`}
          >
            {displayPhoneNumber}
          </h3>
        </div>
        {!isPhoneNumberVisible && (
          <button
            onClick={togglePhoneNumberVisibility}
            className="text-blue-500 text-sm ml-2"
          >
            Click here to show
          </button>
        )}
      </div>
    </div>
  );
}
