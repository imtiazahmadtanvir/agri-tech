"use client";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import { useMarketPlace } from "@/context/MarketplaceContext";
import { FormData } from "@/types/type";
import { timeAgeCalculator } from "@/utils/timeCalculate";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

function MarketplaceMain() {
  const { minPrice, maxPrice, selectedCategories } = useMarketPlace();
  const [searchQuery, setSearchQuery] = useState<string>("");
  console.log(selectedCategories);
  const [sortBy, setSortBy] = useState<string>("");
  console.log(maxPrice);
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
          <LoadingSpinner />
        ) : error ? (
          <div className="flex justify-center items-center">
            <p>{error.message}</p>
          </div>
        ) : items?.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">No listings found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {items?.map((item) => (
              <Link href={`/marketplace/product/${item._id}`} key={item._id}>
                <div className="border p-3 rounded-md">
                  <div className="w-full h-56 relative -z-10">
                    <Image
                      className="object-cover rounded-md border"
                      fill
                      src={
                        typeof item.photos[0] === "string"
                          ? item.photos[0]
                          : URL.createObjectURL(item.photos[0])
                      }
                      alt={item.productName}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mt-2">
                      {item.productName}
                    </h3>

                    <p className="text-gray-800 font-bold mt-1">
                      {item.price} $
                    </p>
                    <p className="text-gray-500 text-sm">{item.location}</p>
                    <p>{timeAgeCalculator(item?.listed || "")}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MarketplaceMain;
