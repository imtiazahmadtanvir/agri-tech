"use client";

import { useMarketPlace } from "@/context/MarketplaceContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { minPrice, maxPrice, selectedCategories, location } = useMarketPlace();
  const [sortBy, setSortBy] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    if (sortBy) {
      params.set("sortBy", sortBy);
    } else {
      params.delete("sortBy");
    }
    if (minPrice) {
      params.set("minPrice", minPrice.toString());
    } else {
      params.delete("minPrice");
    }
    if (maxPrice) {
      params.set("maxPrice", maxPrice.toString());
    } else {
      params.delete("maxPrice");
    }

    if (location) params.set("location", location);
    if (selectedCategories) {
      params.set("category", selectedCategories);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [
    searchParams,
    searchQuery,
    location,
    maxPrice,
    minPrice,
    sortBy,
    selectedCategories,
    replace,
    pathname,
  ]);

  return (
    <div className="my-4 flex justify-between">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
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
  );
}
