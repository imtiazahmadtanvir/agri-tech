"use client";
import { useMarketPlace } from "@/context/MarketplaceContext";
import React from "react";
import { IoAdd } from "react-icons/io5";

export default function Sidebar() {
  const {
    setActiveSection,
    activeSection,
    setMaxPrice,
    maxPrice,
    setMinPrice,
    minPrice,
  } = useMarketPlace();
  return (
    <aside className="w-1/4 my-4 p-6 shadow-md rounded-lg bg-green-50">
      <h3 className="text-xl font-bold mb-2 text-green-700 ">
        Agriculture Marketplace
      </h3>
      <div className="space-y-2">
        <button
          onClick={() => setActiveSection("products")}
          className={`w-full py-2 hover:bg-green-700 hover:text-white px-3 text-left border rounded-md flex items-center ${
            activeSection === "products"
              ? "bg-green-700 text-white"
              : "bg-white"
          }`}
        >
          All products
        </button>
        <button
          onClick={() => setActiveSection("inbox")}
          className={`w-full py-2 hover:bg-green-700 hover:text-white px-3 text-left border rounded-md flex items-center ${
            activeSection === "inbox" ? "bg-green-700 text-white" : "bg-white"
          }`}
        >
          Inbox
        </button>
        <button
          onClick={() => setActiveSection("buying")}
          className={`w-full py-2 hover:bg-green-700 hover:text-white px-3 text-left border rounded-md flex items-center ${
            activeSection === "buying" ? "bg-green-700 text-white" : "bg-white"
          }`}
        >
          Buying
        </button>
        <button
          onClick={() => setActiveSection("selling")}
          className={`w-full py-2 hover:bg-green-700 hover:text-white px-3 text-left border rounded-md flex items-center ${
            activeSection === "selling" ? "bg-green-700 text-white" : "bg-white"
          }`}
        >
          Selling
        </button>
        <button
          onClick={() => setActiveSection("create")}
          className={`w-full py-2 hover:bg-green-700 hover:text-white px-3 text-center border rounded-md flex items-center ${
            activeSection === "create" ? "bg-green-700 text-white" : "bg-white"
          }`}
        >
          <IoAdd /> Create Listing
        </button>
      </div>
      <h3>Location</h3>
      <button>Select Location</button>
      <div>
        <h3>Filters</h3>
        <div className="flex gap-2">
          <input
            value={minPrice}
            max={maxPrice}
            onChange={(e) => setMinPrice(Math.max(0, Number(e.target.value)))}
            className="w-1/2 border p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="number"
          />
          <input
            value={maxPrice}
            min={minPrice}
            max={10000}
            onChange={(e) =>
              setMaxPrice(Math.min(10000, Number(e.target.value)))
            }
            className="w-1/2 border p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="number"
          />
        </div>
        <p></p>
        <input
          max={10000}
          min={0}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-yellow-400 active:accent-amber-700"
          type="range"
          name=""
          id=""
        />
      </div>
      {/* categories */}
      <div>
        <h4>Categories</h4>
      </div>
      <button>Clear Filter</button>
    </aside>
  );
}
