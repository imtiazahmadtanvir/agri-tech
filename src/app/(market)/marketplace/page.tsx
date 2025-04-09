// app/marketplace/page.tsx or any other route
import { timeAgeCalculator } from "@/utils/timeCalculate";
import { FormData } from "@/types/type";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import Search from "@/components/myListing/Search";
import Filters from "@/components/market/marketplace/Filters";

// Fetch listings directly from your API route
async function fetchMarketplaceItems(): Promise<FormData[]> {
  const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/listings`, {
    params: {
      search: "",
      minPrice: 0,
      maxPrice: 1000000,
    },
  });
  return response.data.data;
}

export default async function MarketplaceMain() {
  const items = await fetchMarketplaceItems();

  return (
    <div className="my-4">
      <div>
        <Filters />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {items.length === 0 ? (
          <p className="text-gray-500">No listings found.</p>
        ) : (
          items.map((item) => (
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
                  <p className="text-gray-800 font-bold mt-1">{item.price} $</p>
                  <p className="text-gray-500 text-sm">{item.location}</p>
                  <p>{timeAgeCalculator(item?.listed || "")}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
