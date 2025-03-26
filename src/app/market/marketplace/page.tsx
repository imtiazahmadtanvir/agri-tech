"use client";
import ContainerSmall from "@/components/shared/max-w-container/ContainerSmall";
import React, { useState, useEffect } from "react";
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import { FaSeedling, FaFish, FaEgg, FaShoppingBasket } from "react-icons/fa";
import { GiFarmer, GiFruitTree, GiCow } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";

export default function AgricultureMarketplace() {
  const [items, setItems] = useState([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const categories = [
    "Crops",
    "Fruits",
    "Vegetables",
    "Livestock",
    "Dairy Products",
    "Poultry",
    "Fish & Aquaculture",
    "Organic Produce",
    "Herbs & Medicinal Plants",
    "Other",
  ];
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const categories = [
    { name: "Crops", icon: <FaSeedling /> },
    { name: "Fruits", icon: <GiFruitTree /> },
    { name: "Vegetables", icon: <FaSeedling /> },
    { name: "Livestock", icon: <GiCow /> },
    { name: "Dairy Products", icon: <FaEgg /> },
    { name: "Poultry", icon: <FaEgg /> },
    { name: "Fish & Aquaculture", icon: <FaFish /> },
    { name: "Organic Produce", icon: <GiFarmer /> },
    { name: "Herbs & Medicinal Plants", icon: <FaSeedling /> },
    { name: "Other", icon: <FaShoppingBasket /> },
  ];

  return (
    <ContainerSmall className="flex gap-6 py-6">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 bg-green-50 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-green-700 mb-4">
          Agriculture Marketplace
        </h3>
        <div className="space-y-2">
          <button className=" w-full py-2 px-3 text-left bg-white border rounded-md flex items-center">
            <IoNotificationsOutline className="mr-2" /> Notifications
          </button>
          <button className="block w-full py-2 px-3 text-left bg-white border rounded-md">
            Inbox
          </button>
          <button className="block w-full py-2 px-3 text-left bg-white border rounded-md">
            Buying
          </button>
          <button className="block w-full py-2 px-3 text-left bg-white border rounded-md">
            Selling
          </button>
          <button className="flex items-center gap-1 w-full py-2 px-3 text-left bg-green-700 text-white rounded-md ">
            <IoMdAdd /> Create Listing
          </button>
        </div>

        <h3 className="text-lg font-semibold text-green-700 mt-6">Location</h3>
        <button className="block w-full py-2 px-3 text-left bg-white border rounded-md">
          Select Location
        </button>

        <h3 className="text-lg font-semibold text-green-700 mt-6">Filters</h3>
        <div>
          <h4 className="text-md font-medium text-green-700">Price Range</h4>
          <div className="flex items-center gap-2 mb-2">
            <input
              placeholder="Min"
              className="w-1/2 border p-2 rounded-md"
              type="number"
            />
            <input
              placeholder="Max"
              className="w-1/2 border p-2 rounded-md"
              type="number"
            />
          </div>
          <input
            max={1000}
            min={0}
            type="range"
            className="w-full accent-green-500"
          />
        </div>

        <div className="mt-6">
          <h4 className="text-md font-medium text-green-700">Categories</h4>
          {categories.map((cat) => (
            <label
              key={cat.name}
              className="flex items-center mb-2 cursor-pointer hover:text-green-600"
            >
              {cat.icon} <input type="checkbox" className="ml-2" />{" "}
              <span className="ml-2">{cat.name}</span>
            </label>
          ))}
        </div>

        <button className="w-full mt-4 py-2 bg-red-500 text-white rounded-md">
          Clear Filters
        </button>
      </aside>

      {/* Main Content */}
      <div className="w-3/4">
        <section className="flex justify-between items-center mb-4">
          <select className="border px-3 py-2 rounded-md">
            <option>Date: Newest on Top</option>
            <option>Date: Oldest on Top</option>
            <option>Price: High to Low</option>
            <option>Price: Low to High</option>
          </select>
          <div className="max-w-[300px] relative">
            <input
              type="search"
              className="border px-4 py-2 w-full rounded-full"
              placeholder="Search..."
            />
            <div className="absolute right-1.5 top-1.5 flex justify-center items-center size-8 bg-green-600 text-white rounded-full">
              <IoSearch size={20} />
            </div>
          </div>
        </section>
        <p className="text-gray-600">Products will be displayed here...</p>
      </div>
    </ContainerSmall>
  );
}
