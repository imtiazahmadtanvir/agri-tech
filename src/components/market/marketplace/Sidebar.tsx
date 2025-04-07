"use client";
import LocationModal from "@/components/modal/LocationModal";
import { useMarketPlace } from "@/context/MarketplaceContext";
import Link from "next/link";
import React, { useState } from "react";
import { IoAdd, IoLocationSharp } from "react-icons/io5";

export default function Sidebar() {
  const {
    pathname,
    setMaxPrice,
    maxPrice,
    setMinPrice,
    minPrice,
    setSelectedCategories,
  } = useMarketPlace();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const marketplaceCategories = [
    { name: "crops", emoji: "🌾" },
    { name: "livestock", emoji: "🐄" },
    { name: "Seeds & Plants", emoji: "🌱" },
    { name: "fertilizers", emoji: "💧" },
    { name: "equipment", emoji: "🛠️" },
    { name: "pesticides", emoji: "🌿" },
    { name: "Animal Feed", emoji: "🐾" },
    { name: "fisheries", emoji: "🐟" },
  ];

  return (
    <aside className=" h-fit sticky top-0  left-0 my-4 p-3 shadow-md rounded-lg bg-green-50">
      {/* Marketplace Section */}
      <h3 className="text-xl font-bold mb-4 text-green-700">
        Agriculture Marketplace
      </h3>

      {/* Navigation Buttons */}
      <div className="space-y-2">
        <Link
          href="/marketplace"
          className={`w-full py-2 px-3 text-left border rounded-md flex items-center hover:bg-green-700 hover:text-white ${
            pathname === "/marketplace" ? "bg-green-700 text-white" : "bg-white"
          }`}
        >
          All Products
        </Link>

        <Link
          href="/marketplace/inbox"
          className={`w-full py-2 px-3 text-left border rounded-md flex items-center hover:bg-green-700 hover:text-white ${
            pathname === "/marketplace/inbox"
              ? "bg-green-700 text-white"
              : "bg-white"
          }`}
        >
          Inbox
        </Link>

        <Link
          href="/marketplace/selling"
          className={`w-full py-2 px-3 text-left border rounded-md flex items-center hover:bg-green-700 hover:text-white ${
            pathname === "/marketplace/selling"
              ? "bg-green-700 text-white"
              : "bg-white"
          }`}
        >
          My Listing
        </Link>

        {/* Create Listing Button */}
        <Link
          href={"/marketplace/create"}
          className={`w-full py-2 px-3 text-center border rounded-md flex items-center justify-center gap-2 hover:bg-green-700 hover:text-white ${
            pathname === "/marketplace/create"
              ? "bg-green-700 text-white"
              : "bg-white"
          }`}
        >
          <IoAdd /> Create Listing
        </Link>
      </div>

      {/* Location Selector */}
      <div className="">
        {/* Price Filters */}
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">Filters</h3>

            <button className="">Clear </button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Location</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2 mt-2 border rounded-md bg-white hover:bg-green-100"
            >
              Select Location
            </button>
            <LocationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
              <p className="text-center py-4 border-b">Change location</p>
              <div className="px-4 py-3.5">
                <label className="flex items-center" htmlFor="location">
                  <IoLocationSharp /> Location
                </label>
                <input
                  type="text"
                  className="w-full px-4 rounded-md py-3"
                  placeholder="Enter your city"
                  name=""
                  id="location"
                />
              </div>
            </LocationModal>
          </div>
          <div className="flex gap-2 mt-2">
            <input
              value={minPrice}
              max={maxPrice}
              onChange={(e) => setMinPrice(Math.max(0, Number(e.target.value)))}
              className="w-1/2 border p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="number"
              placeholder="Min Price"
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
              placeholder="Max Price"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Categories</h3>
          <div className="space-y-2 mt-2">
            {marketplaceCategories.map(({ name, emoji }) => (
              <button
                key={name}
                onClick={() => setSelectedCategories(name)}
                className="w-full py-2 px-3 text-left border rounded-md bg-white hover:bg-green-100 flex items-center gap-2"
              >
                {emoji}
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
