"use client";
import React, { useState } from "react";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPhoto, setProductPhoto] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Added:", { productName, productPhoto, description });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Product Name */}
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          className="border p-2 rounded-md"
        />

        {/* Product Photo */}
        <label htmlFor="productPhoto">Product Photo:</label>
        <input
          type="file"
          id="productPhoto"
          name="productPhoto"
          accept="image/*"
          onChange={(e) => setProductPhoto(e.target.files[0])}
          className="border p-2 rounded-md"
        />

        {/* Product Description */}
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          className="border p-2 rounded-md"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
