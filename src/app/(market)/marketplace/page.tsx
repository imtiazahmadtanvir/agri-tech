"use client";
import { useMarketPlace } from "@/context/MarketplaceContext";
import { MarketplaceItemForBuy } from "@/types/type";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

function MarketplaceMain() {
  const { minPrice, maxPrice, selectedCategories } = useMarketPlace();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<MarketplaceItemForBuy[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  console.log(maxPrice);

  useEffect(() => {}, []);
  return (
    <>
      <div className="my-4 flex justify-between">
        <select className="border px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">Date: Newest on Top</option>
          <option value="date-old">Date: Oldest on Top</option>
          <option value="price-high">Price: High to Low</option>
          <option value="price-low">Price: Low to High</option>
        </select>
        <div className="max-w-[300px] relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-4 py-2 w-full rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search..."
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex justify-center items-center size-8 bg-yellow-400 text-white rounded-full">
            <IoSearch size={20} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MarketplaceMain;
