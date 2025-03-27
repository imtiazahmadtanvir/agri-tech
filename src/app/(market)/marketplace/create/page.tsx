"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
const marketplaceCategories = [
  { name: "Harvested Products" },
  { name: "Fertilizers & Pesticides" },
  { name: "Agricultural Machinery" },
  { name: "Farming Tools" },
  { name: "Livestock" },
  { name: "Animal Feed" },
  { name: "Seeds & Plants" },
  { name: "Irrigation & Watering Systems" },
  { name: "Storage & Packaging" },
  { name: "Greenhouse Equipment" },
];
export default function CreateListing() {
  const [previews, setPreviews] = useState<string[]>([]);
  // for file
  const handelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    if (newFiles.length === 0) return;
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };
  // for delete photo
  const handelRemovePhoto = (index: number) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };
  return (
    <div className="my-4 p-4 rounded-md border">
      <form className="grid grid-cols-2 gap-4">
        {/* photo */}
        <div className="mb-4">
          <h3 className="text-2xl font-semibold ">Item for sale</h3>
          <p>Photos {previews.length}/4- You can add up to 4 photos</p>
        </div>
        <div
          className={`col-span-2 gap-3  ${
            previews.length < 1 ? "h-32" : "flex flex-wrap"
          }`}
        >
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <div className="relative w-44 h-32 overflow-hidden rounded-md border">
                <Image
                  className="object-cover"
                  layout="fill"
                  alt={`Preview ${index + 1}`}
                  src={preview}
                />
              </div>
              <button
                onClick={() => handelRemovePhoto(index)}
                className="absolute top-0 text-red-500 cursor-pointer right-0"
                type="button"
              >
                <IoMdCloseCircle size={25} />
              </button>
            </div>
          ))}
          {/* file input */}
          <div className={`${previews.length >= 4 ? "hidden" : ""}`}>
            <input
              multiple
              accept="image/*"
              className="hidden"
              id="file"
              type="file"
              onChange={handelFileChange}
            />
            <label
              className={`${
                previews.length < 1 ? "w-full h-32" : "size-32"
              } border flex flex-col items-center justify-center rounded-md`}
              htmlFor="file"
            >
              <MdOutlineAddPhotoAlternate
                size={30}
                className="text-green-400"
              />
              Add photo
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category *
          </label>
          <select
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            name="category"
            id=""
          >
            <option value="">Select a category</option>
            {marketplaceCategories.map((cat) => (
              <option key={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        {/* description */}
        <div className="col-span-2 w-full">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
            name="description"
            id=""
          ></textarea>
        </div>
        {/* price */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="border p-2 rounded-md w-full"
            type="number"
            name="price"
          />
        </div>
        {/* quantity */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            className="border p-2 rounded-md w-full"
            type="number"
            name="quantity"
          />
        </div>
        {/* contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Information
          </label>
          <input
            type="text"
            name="contactInfo"
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., 555-123-4567"
          />
        </div>
        {/*  */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Availability Date
          </label>
          <input
            type="date"
            name="availabilityDate"
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </form>
    </div>
  );
}
