import Search from "@/components/myListing/Search";
import axios from "axios";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
type Listing = {
  _id: string;
  productName: string;
  price: string;
  location: string;
  photos: string[];
  listed: string;
};
export default async function MyListing({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const param = await searchParams;
  const search = param.search || "";

  const res = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/myListing?search=${search}`,
    {
      headers: Object.fromEntries(await headers()),
    }
  );

  const listings: Listing[] = res.data.data || [];

  return (
    <div className="my-4 px-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">My Listings</h3>
        <Search />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((item) => (
          <div
            key={item._id}
            className="border rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all bg-white"
          >
            <div className="relative w-full h-48 -z-10">
              <Image
                src={item.photos?.[0]}
                alt={item.productName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       33vw"
              />
            </div>
            <div className="p-4">
              <h4 className="text-xl font-bold text-gray-800 mb-1">
                {item.productName}
              </h4>
              <p className="text-gray-600 mb-2">Location: {item.location}</p>
              <p className="text-green-600 font-semibold mb-2">
                Price: ৳{item.price}
              </p>
              <p className="text-sm text-gray-500">
                Listed: {new Date(item.listed).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
