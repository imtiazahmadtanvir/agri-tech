"use client";

import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function Sidebar() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const marketplaceCategories = [
    { id: 1, name: "Fresh Fruits" },
    { id: 2, name: "Vegetables" },
    { id: 3, name: "Grains & Cereals" },
    { id: 4, name: "Dairy Products" },
    { id: 5, name: "Eggs" },
    { id: 6, name: "Honey & Jams" },
    { id: 7, name: "Organic Products" },
    { id: 8, name: "Herbs & Spices" },
    { id: 9, name: "Poultry & Meat" },
    { id: 10, name: "Flowers & Plants" },
  ];

  const restFiler = () => {
    setPriceRange([0, 10000]);
    // set other states like setMaxPrice, setMinPrice, etc.
  };

  return (
    <aside className="h-fit sticky mt-4 top-0 left-0">
      <div className="border rounded-2xl">
        {/* Categories */}
        <h3 className="bg-[#0D401C] text-2xl rounded-t-2xl border py-3.5 text-white border-[#0D401C] font-bold px-5">
          Categories
        </h3>
        <div className="flex px-7 pb-3 flex-col text-left">
          {marketplaceCategories.map((item) => (
            <button
              className={`text-xl py-4 px-2 text-left w-full border-dashed ${
                item.id !== 10 ? "border-b" : ""
              }`}
              key={item.id}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Price Range */}
      </div>
      <div className="border rounded-2xl mt-6">
        <h4 className="bg-[#0D401C] text-2xl rounded-t-2xl border py-3.5 text-white border-[#0D401C] font-bold px-5">
          Filter by Price
        </h4>
        <div className="px-7 pt-6">
          <RangeSlider
            min={0}
            max={10000}
            step={10}
            defaultValue={priceRange}
            onInput={setPriceRange}
            className="custom-slider accent-green-400 "
          />
        </div>
        <div className="mt-2 px-7 py-3 text-sm">
          Price ৳ {priceRange[0]} - ৳ {priceRange[1]}
        </div>
      </div>
    </aside>
  );
}
