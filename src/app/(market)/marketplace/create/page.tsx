"use client";
import CategoryFields from "@/components/market/marketplace/CategoryFields";
import PhoneNumberInput from "@/components/market/marketplace/PhoneNumberInput";
import { FormData } from "@/types/type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
const marketplaceCategories = [
  { name: "crops" },
  { name: "livestock" },
  { name: "Seeds & Plants" },
  { name: "fertilizers" },
  { name: "equipment" },
  { name: "pesticides" },
  { name: "Animal Feed" },
  { name: "fisheries" },
];
export default function CreateListing() {
  const { data } = useSession();
  console.log(data);
  const [previews, setPreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    location: "",
    availabilityDate: "",
    contactInfo: "",
    photos: [],
    unit: "",
    isNegotiable: false,
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" && value !== "" ? Number(value) : value,
    }));
  };
  console.log(formData);
  // for file
  const handelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    if (newFiles.length === 0) return;
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      photos: [...(prev.photos || []), ...newFiles],
    }));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };
  // for delete photo
  const handelRemovePhoto = (index: number) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos?.filter((_, i) => i !== index),
    }));
  };
  // for check box
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };
  return (
    <div className="my-4 p-4 bg-[#F7F9F7] rounded-md border">
      <div className="">
        <h3 className="text-2xl font-semibold ">Item for sale</h3>
        <p>Photos {previews.length}/4- You can add up to 4 photos</p>
      </div>
      <form className="grid grid-cols-2 gap-4">
        {/* photo */}
        <div
          className={`col-span-2 gap-3   ${
            previews.length < 1 ? "" : "grid grid-cols-4"
          }`}
        >
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <div className="relative w-full h-32 overflow-hidden rounded-md border">
                <Image
                  className="object-cover"
                  fill
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
                previews.length < 1 ? "w-full h-32" : "h-32"
              } border flex flex-col items-center bg-white cursor-pointer justify-center rounded-md`}
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
            Title
          </label>
          <input
            type="text"
            required
            placeholder="product name"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="mt-1  block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category *
          </label>
          <select
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
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
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
            placeholder="more details about the product"
            name="description"
            required
          ></textarea>
        </div>
        <div className="col-span-2 grid-cols-2 grid gap-4">
          {/* unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unit
            </label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select unit</option>
              <option value="kg">kg</option>
              <option value="ton">ton</option>
              <option value="piece">piece</option>
              <option value="litre">litre</option>
              <option value="dozen">dozen</option>
            </select>
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
              className="border [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none p-2 rounded-md w-full"
              type="number"
              name="quantity"
              required
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-3 gap-4 ">
          {/* price */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="price"
            >
              Price($)
            </label>
            <input
              className="border [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none p-2 rounded-md w-full"
              type="number"
              name="price"
              placeholder="Pick a good price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          {/* Price Negotiation Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isNegotiable"
              name="isNegotiable"
              checked={formData.isNegotiable}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <label htmlFor="isNegotiable" className="text-sm text-gray-700">
              Price Negotiable
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              className=" block w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Springfield Farm, IL"
              required
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-3 gap-4">
          {/* location */}
          {formData.category && (
            <div className="col-span-3">
              <CategoryFields
                formData={formData}
                handleChange={handleChange}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
          )}
          {/* contact */}
        </div>
        <div className="col-span-2">
          <h3>Contact details</h3>
          <div className="flex gap-12">
            <div>
              <p>Name</p>
              <h3>{data?.user?.name}</h3>
            </div>
            <div>
              <p>Email</p>
              <h3>{data?.user?.email}</h3>
            </div>
          </div>
        </div>
        <PhoneNumberInput />
        <button
          type="submit"
          className="col-span-2 w-full py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
}
