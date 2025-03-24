"use client";
import React, { useState } from "react";
import Image from "next/image";
import { imageUpload } from "@/utils/imageUrl";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPhoto, setProductPhoto] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [isOrganic, setIsOrganic] = useState(false);
  const [location, setLocation] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contactNumber, setContactNumber] = useState("");

  interface Product {
    productName: string;
    productPhoto: string;
    description: string;
    price: number; // Changed to number
    unit: string;
    quantity: string;
    category: string;
    isOrganic: boolean;
    location: string;
    contactNumber: string;
    availabilityDate: string;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProductPhoto(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Ensure price is a number before submission
    if (price === "") {
      setError("Price is required.");
      setIsSubmitting(false);
      return;
    }

    try {
      let imageUrl = "";
      if (productPhoto) {
        imageUrl = await imageUpload(productPhoto);
      }

      const productData: Product = {
        productName,
        productPhoto: imageUrl,
        description,
        price: Number(price), // Convert to number
        unit,
        quantity,
        category,
        isOrganic,
        location,
        contactNumber,
        availabilityDate,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        productData
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
      setProductName("");
      setProductPhoto(null);
      setImagePreview(null);
      setDescription("");
      setPrice(""); // Reset to empty string
      setUnit("");
      setQuantity("");
      setCategory("");
      setIsOrganic(false);
      setLocation("");
      setContactNumber("");
      setAvailabilityDate("");
    } catch (err) {
      toast.error("Something went wrong");
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Your Farm Product
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="e.g., +1-123-456-7890"
              pattern="[0-9+-\s]*"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          {/* Product Photo */}
          <div>
            <label
              htmlFor="productPhoto"
              className="block text-sm font-medium text-gray-700"
            >
              Product Photo
            </label>
            <input
              type="file"
              id="productPhoto"
              name="productPhoto"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-500 file:text-white hover:file:bg-green-600"
            />
            {imagePreview && (
              <div className="mt-4">
                <Image
                  height={200}
                  width={200}
                  src={imagePreview}
                  alt="Product Preview"
                  className="max-w-full h-auto rounded-md border border-gray-300"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Price and Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value === "" ? "" : Number(e.target.value))
                }
                placeholder="e.g., 2.50"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="unit"
                className="block text-sm font-medium text-gray-700"
              >
                Unit of Sale
              </label>
              <select
                id="unit"
                name="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select unit</option>
                <option value="kg">Per Kilogram</option>
                <option value="lb">Per Pound</option>
                <option value="dozen">Per Dozen</option>
                <option value="liter">Per Liter</option>
                <option value="unit">Per Unit</option>
              </select>
            </div>
          </div>

          {/* Quantity and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity Available
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select category</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="dairy">Dairy</option>
                <option value="honey">Honey</option>
                <option value="grains">Grains</option>
                <option value="poultry">Poultry</option>
                <option value="livestock">Livestock</option>
                <option value="fishery">Fish & Aquaculture</option>
                <option value="organic-products">Organic Products</option>
                <option value="spices">Spices</option>
                <option value="flowers">Flowers & Plants</option>
                <option value="herbs">Herbs</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Organic Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="organic"
              name="organic"
              checked={isOrganic}
              onChange={(e) => setIsOrganic(e.target.checked)}
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label
              htmlFor="organic"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Organic
            </label>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Farm Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Austin, TX"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Availability Date */}
          <div>
            <label
              htmlFor="availabilityDate"
              className="block text-sm font-medium text-gray-700"
            >
              Available From
            </label>
            <input
              type="date"
              id="availabilityDate"
              name="availabilityDate"
              value={availabilityDate}
              onChange={(e) => setAvailabilityDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md text-white transition-colors duration-200 ${
              isSubmitting
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isSubmitting ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
