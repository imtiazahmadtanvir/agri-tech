import ContainerSmall from "@/components/shared/max-w-container/ContainerSmall";
import React from "react";
import { IoSearch } from "react-icons/io5";

export default function Marketplace() {
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
  return (
    <ContainerSmall className="flex gap-6 py-6">
      {/* sidebar */}
      <aside className="w-1/4">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        {/* price range */}
        <div>
          <h4>Price Range</h4>
          <div className="flex items-center gap-2 mb-2">
            <input
              placeholder="Min"
              className="w-1/2 border p-2"
              type="number"
              name=""
              id=""
            />
            <input
              placeholder="Max"
              className="w-1/2 border p-2"
              type="number"
              name=""
              id=""
            />
          </div>
          <input
            max={1000}
            min={0}
            type="range"
            className="w-full accent-blue-500"
            name=""
            id=""
          />
          <p></p>
        </div>
        {/* categories */}
        <div className="mb-6">
          <h4>Categories</h4>
          {categories.map((cat) => (
            <label key={cat} className="flex items-center mb-2">
              <input type="checkbox" name="" id="" className="mr-2" />
              <span>{cat}</span>
            </label>
          ))}
        </div>
        {/* clear Filters */}
        <button>Clear All Filter</button>
      </aside>
      {/* main content */}
      <div className="w-3/4">
        <section className="flex justify-between items-center">
          <div>
            <select className="border px-2.5 py-3" name="sort" id="">
              <option value="">Date: Newest on Top</option>
              <option value="">Date: Oldest on Top</option>
              <option value="">Price: High to Low</option>
              <option value="">Price: Low to High</option>
            </select>
          </div>
          <div className="max-w-[300px] relative">
            <input
              type="search"
              className="border px-4 rounded-full w-full py-2"
              placeholder="Search..."
            />
            <div className="absolute right-1.5 top-1.5 flex justify-center items-center size-8 bg-[#FFC800] rounded-full">
              <IoSearch size={25} />
            </div>
          </div>
        </section>
      </div>
    </ContainerSmall>
  );
}
