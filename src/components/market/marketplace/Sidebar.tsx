"use client";
import { useMarketPlace } from "@/context/MarketplaceContext";
import Link from "next/link";
import React from "react";
import { IoAdd, IoLeaf, IoColorPalette, IoLeafOutline } from "react-icons/io5";
import { PiFarmBold } from "react-icons/pi";
export default function Sidebar() {
  const {
    setActiveSection,
    activeSection,
    setMaxPrice,
    maxPrice,
    setMinPrice,
    minPrice,
  } = useMarketPlace();

  const marketplaceCategories = [
    { name: "Harvested Products", icon: <PiFarmBold /> },
    { name: "Fertilizers & Pesticides", icon: <IoLeafOutline /> },
    { name: "Agricultural Machinery", icon: <IoColorPalette /> },
    { name: "Farming Tools", icon: <IoLeaf /> },
    { name: "Livestock", icon: <PiFarmBold /> },
    { name: "Animal Feed", icon: <IoLeafOutline /> },
    { name: "Seeds & Plants", icon: <IoLeafOutline /> },
    { name: "Irrigation & Watering Systems", icon: <IoColorPalette /> },
    { name: "Storage & Packaging", icon: <IoLeaf /> },
    { name: "Greenhouse Equipment", icon: <PiFarmBold /> },
  ];

  return (
    <aside className="w-1/4 my-4 p-3 shadow-md rounded-lg bg-green-50">
      {/* Marketplace Section */}
      <h3 className="text-xl font-bold mb-4 text-green-700">
        Agriculture Marketplace
      </h3>

      {/* Navigation Buttons */}
      <div className="space-y-2">
        <Link
          href="/marketplace"
          onClick={() => setActiveSection("products")}
          className={`w-full py-2 px-3 text-left border rounded-md flex items-center hover:bg-green-700 hover:text-white ${
            activeSection === "products"
              ? "bg-green-700 text-white"
              : "bg-white"
          }`}
        >
          Products
        </Link>

        <Link
          href="/marketplace/inbox"
          onClick={() => setActiveSection("inbox")}
          className={`w-full py-2 px-3 text-left border rounded-md flex items-center hover:bg-green-700 hover:text-white ${
            activeSection === "inbox" ? "bg-green-700 text-white" : "bg-white"
          }`}
        >
          Inbox
        </Link>

        <Link
          href="/marketplace/buying"
          onClick={() => setActiveSection("buying")}
          className={`w-full py-2 px-3 text-left border rounded-md flex items-center hover:bg-green-700 hover:text-white ${
            activeSection === "buying" ? "bg-green-700 text-white" : "bg-white"
          }`}
        >
          Buying
        </Link>

        <Link
          href="/marketplace/selling"
          onClick={() => setActiveSection("selling")}
          className={`w-full py-2 px-3 text-left border rounded-md flex items-center hover:bg-green-700 hover:text-white ${
            activeSection === "selling" ? "bg-green-700 text-white" : "bg-white"
          }`}
        >
          Selling
        </Link>

        {/* Create Listing Button */}
        <Link
          href={"/marketplace/create"}
          onClick={() => setActiveSection("create")}
          className={`w-full py-2 px-3 text-center border rounded-md flex items-center justify-center gap-2 hover:bg-green-700 hover:text-white ${
            activeSection === "create" ? "bg-green-700 text-white" : "bg-white"
          }`}
        >
          <IoAdd /> Create Listing
        </Link>
      </div>

      {/* Location Selector */}
      <div className="">
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Location</h3>
          <button className="w-full py-2 mt-2 border rounded-md bg-white hover:bg-green-100">
            Select Location
          </button>
        </div>

        {/* Price Filters */}
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">Filters</h3>
            <button className="">Clear </button>
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

          <input
            max={10000}
            min={0}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full mt-2 accent-yellow-400 active:accent-amber-700"
            type="range"
          />
        </div>

        {/* Categories */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Categories</h3>
          <div className="space-y-2 mt-2">
            {marketplaceCategories.map(({ name, icon }) => (
              <button
                key={name}
                className="w-full py-2 px-3 text-left border rounded-md bg-white hover:bg-green-100 flex items-center gap-2"
              >
                {icon}
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
