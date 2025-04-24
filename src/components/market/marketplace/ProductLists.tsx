import Image from "next/image";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

interface Product {
  _id: string;
  productName: string;
  photoUrls?: string[];
  price: string;
}

export default function ProductLists({ items }: { items: Product[] }) {
  if (!items || items.length === 0) {
    return <p>No products found.</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div className="border p-4 rounded-2xl" key={item._id}>
          {item.photoUrls?.[0] && (
            <div className="w-full h-64 relative -z-10">
              <Image
                className="object-contain"
                fill
                src={item.photoUrls[0]}
                alt={item.productName}
              />
            </div>
          )}
          <h3 className=" font-medium">{item.productName}</h3>
          <h4 className="text-[#3D9958] font-medium flex items-center gap-0.5">
            {item.price}.00 <FaBangladeshiTakaSign />{" "}
          </h4>
          <div>
            <button className="size-8 flex justify-center cursor-pointer rounded-full border items-center text-[#3D9958] hover:text-white hover:bg-[#3D9958]">
              <FaShoppingCart />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
