"use client";

import { productCategories } from "@/lib/productCategory";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useMarketPlace } from "@/context/MarketplaceContext";
import { useSearchParams } from "next/navigation";
interface HandleChangeEvent {
  target: {
    id: string;
    value: string;
  };
}
export default function Sidebar() {
  const searchParams = useSearchParams();

  const { setCategory, setMaxPrice, setMinPrice } = useMarketPlace();
  const category = searchParams.get("category")?.toString();

  const handleChange = (e: HandleChangeEvent) => {
    const { id, value } = e.target;
    if (id === "minPrice") setMinPrice(Number(value));
    if (id === "maxPrice") setMaxPrice(Number(value));
  };
  return (
    <aside className="h-fit sticky mt-4 top-0 left-0">
      <div className="border rounded-2xl">
        <h3 className="bg-[#0D401C] text-lg rounded-t-2xl border py-3.5 text-white border-[#0D401C] font-bold px-5">
          Categories
        </h3>
        <div className="flex px-7 pb-3 flex-col text-left">
          <button
            onClick={() => setCategory("")}
            className={`group cursor-pointer py-4 px-2 text-left w-full border-dashed 
              hover:text-green-700 
              ${category ? "" : "text-green-700"}
              transition-all duration-300  border-b`}
          >
            <span className="relative">
              <span
                className={`absolute left-[-20px] opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all translate-y-1 duration-300 text-[#F8C32C] ${
                  category ? "" : "opacity-100 translate-x-1"
                }`}
              >
                <FiArrowRight />
              </span>
              All Product
            </span>
          </button>
          {productCategories.map((item) => (
            <button
              onClick={() => setCategory(item.name)}
              className={`group cursor-pointer py-4 px-2 text-left w-full border-dashed 
              hover:text-green-700  
              ${category === item.name ? "text-green-700" : ""} 
              transition-all duration-300 ${item.id !== 10 && "border-b"}`}
              key={item.id}
            >
              <span className="relative">
                <span
                  className={`absolute left-[-20px] opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all translate-y-1 duration-300 text-[#F8C32C] ${
                    category === item.name ? "opacity-100 translate-x-1" : ""
                  }`}
                >
                  <FiArrowRight />
                </span>
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter Section */}
      <div className="border rounded-2xl mt-6">
        <h4 className="bg-[#0D401C] text-lg rounded-t-2xl border py-3.5 text-white border-[#0D401C] font-bold px-5">
          Filter by Price
        </h4>
        <div className="px-7 pt-6 flex gap-4">
          <div className="flex flex-col">
            <label htmlFor="minPrice" className="text-sm font-medium">
              Min Price
            </label>
            <input
              id="minPrice"
              type="number"
              min="0"
              max="10000"
              step="10"
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="maxPrice" className="text-sm font-medium">
              Max Price
            </label>
            <input
              id="maxPrice"
              type="number"
              min="0"
              max="100000"
              step="10"
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 border rounded-2xl">
        <h4 className="bg-[#0D401C] text-lg rounded-t-2xl border py-3.5 text-white border-[#0D401C] font-bold px-5">
          Popular Products
        </h4>
        <div className="px-7 pb-3"></div>
      </div>
    </aside>
  );
}
