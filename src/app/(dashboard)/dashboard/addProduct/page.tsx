"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPhoto, setProductPhoto] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [isOrganic, setIsOrganic] = useState(false);
  const [location, setLocation] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  interface Product {
    productName: string;
    productPhoto: File | null;
    description: string;
    price: string;
    unit: string;
    quantity: string;
    category: string;
    isOrganic: boolean;
    location: string;
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const productData: Product = {
      productName,
      productPhoto,
      description,
      price,
      unit,
      quantity,
      category,
      isOrganic,
      location,
      availabilityDate,
    };
    console.log("Product Added:", productData);

    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Your Farm Product
        </h1>
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
            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <Image
                  height={200}
                  width={200}
                  src={imagePreview}
                  alt="Product Preview"
                  className="max-w-full h-auto rounded-md border border-gray-300"
                  style={{ maxHeight: "200px" }} // Limit height for better layout
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
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 2.50"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
              >
                <option value="">Select category</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="dairy">Dairy</option>
                <option value="honey">Honey</option>
                <option value="grains">Grains</option>
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
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
