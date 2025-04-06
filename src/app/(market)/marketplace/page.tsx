"use client";
import { useMarketPlace } from "@/context/MarketplaceContext";
import { FormData } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

function MarketplaceMain() {
  const { minPrice, maxPrice, selectedCategories } = useMarketPlace();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  async function fetchItems(): Promise<FormData[]> {
    const response = await axios.get("/api/listings");
    return response.data.data;
  }
  const {
    data: items,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["marketplaceItems"],
    queryFn: fetchItems,
  });
  console.log(items);
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
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center">
            <p>{error.message}</p>
          </div>
        ) : items?.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">No listings found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items?.map((item) => (
              <div className="border p-3 rounded-md" key={item._id}>
                <div>
                  <Image
                    width={300}
                    height={200}
                    src={
                      typeof item.photos[0] === "string"
                        ? item.photos[0]
                        : URL.createObjectURL(item.photos[0])
                    }
                    alt={item.productName}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mt-2">
                    {item.productName}
                  </h3>

                  <p className="text-gray-800 font-bold mt-1">
                    Price: {item.price} $
                  </p>
                  <p className="text-gray-500 text-sm">
                    Location: {item.location}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Contact: {item.phoneNumber}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MarketplaceMain;
