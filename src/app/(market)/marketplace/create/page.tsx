"use client";

import React from "react";

export default function CreateListing() {
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
  return (
    <div>
      <form className="grid grid-cols-2">
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
      </form>
    </div>
  );
}
