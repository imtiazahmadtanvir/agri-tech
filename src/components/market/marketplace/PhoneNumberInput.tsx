"use client";
import React, { useState } from "react";

export default function PhoneNumberInput() {
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(["01609553810"]);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const handleAddPhoneNumber = () => {
    if (
      newPhoneNumber.trim() !== "" &&
      !phoneNumbers.includes(newPhoneNumber)
    ) {
      setPhoneNumbers((prev) => [...prev, newPhoneNumber]);
      setNewPhoneNumber("");
    }
  };

  const handleRemovePhoneNumber = (index: number) => {
    setPhoneNumbers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <h4 className="text-lg font-semibold">Add Phone Number</h4>
      <div className="mt-3">
        {phoneNumbers.map((number, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-2 rounded-md my-1"
          >
            <span>{number}</span>
            <button
              onClick={() => handleRemovePhoneNumber(index)}
              className="text-red-500 hover:text-red-700"
              type="button"
            >
              Remove
            </button>
          </div>
        ))}
      </div>{" "}
      <div className="space-x-2 mt-2 flex">
        <input
          placeholder="Enter phone number"
          className="border px-3 py-2 rounded-md w-full"
          type="tel"
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
        />
        <button
          onClick={handleAddPhoneNumber}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          type="button"
        >
          Add
        </button>
      </div>
      {/* Added phone numbers list */}
    </div>
  );
}
