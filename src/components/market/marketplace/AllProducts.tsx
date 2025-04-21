import { timeAgeCalculator } from "@/utils/timeCalculate";
import { FormData } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import axios from "axios";

export default async function AllProducts({ param }) {
  const search = param.search || "";
  const minPrice = param.minPrice || 0;
  const maxPrice = param.maxPrice || 100000000;
  const sortBy = param.sortBy || "";
  const location = param.location || "";
  const categories = param.category || "";
  const page = param.page || "1";
  const limit = param.limit || "10";
  let errorMessage = "";
  let items: FormData[] = [];
  let itemCount = 10;
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/listings`, {
      params: {
        search,
        maxPrice,
        minPrice,
        sortBy,
        location,
        categories,
        page,
        limit,
      },
    });

    items = res.data.data;
    itemCount = res.data.total;
  } catch (error) {
    console.error("Error fetching marketplace items:", error);
    errorMessage = "Failed to fetch marketplace items. Please try again later.";
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {items.length === 0 && !errorMessage ? (
        <p className="text-gray-500">No listings found.</p>
      ) : (
        items.map((item) => (
          <Link href={`/marketplace/product/${item._id}`} key={item._id}>
            <div className="border hover:shadow-xl p-3 rounded-md">
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
                <h3 className="text-lg font-semibold capitalize mt-2">
                  {item.productName}
                </h3>
                <p className="text-green-400 font-bold mt-1">{item.price} $</p>
                <p className="text-gray-500 text-sm">{item.location}</p>
                <p>{timeAgeCalculator(item?.listed || "")}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
