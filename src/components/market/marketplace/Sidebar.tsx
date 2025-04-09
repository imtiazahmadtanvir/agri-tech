"use client";
import LocationModal from "@/components/modal/LocationModal";
import { useMarketPlace } from "@/context/MarketplaceContext";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";

export default function Sidebar() {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  console.log(path);
  const {
    pathname,
    setMaxPrice,
    setMinPrice,
    setSelectedCategories,
    maxPrice,
    minPrice,
    setLocation,
    location,
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
  const restFiler = () => {
    setMaxPrice("");
    setMinPrice("");
    setSelectedCategories("");
    setLocation("all location");
  };
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
          href="/marketplace/myListing"
          className={`w-full py-2 px-3 text-left border rounded-md flex items-center hover:bg-green-700 hover:text-white ${
            pathname === "/marketplace/myListing"
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
      <div className={`${pathname !== "/marketplace" ? "hidden" : ""}`}>
        {/* Price Filters */}
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">Filters</h3>

            <button
              onClick={restFiler}
              className="text-blue-500 cursor-pointer"
            >
              Clear
            </button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Location</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full cursor-pointer flex justify-center gap-1 items-center py-2 mt-2 border rounded-md bg-white hover:bg-green-100"
            >
              <span className="text-yellow-500">
                <FaLocationDot />
              </span>
              <span className="capitalize">{location}</span>
            </button>
            <LocationModal
              setLocation={setLocation}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            ></LocationModal>
          </div>
          <div className="flex gap-2 mt-2">
            <input
              onChange={(e) => {
                const value = Math.max(0, Number(e.target.value));
                if (value <= Number(maxPrice) || maxPrice === "") {
                  setMinPrice(value);
                }
              }}
              className="w-1/2 border p-2 rounded-md [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="number"
              placeholder="Min Price"
            />

            <input
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= Number(minPrice) || minPrice === "") {
                  setMaxPrice(value);
                }
              }}
              className="w-1/2 border p-2 rounded-md [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
