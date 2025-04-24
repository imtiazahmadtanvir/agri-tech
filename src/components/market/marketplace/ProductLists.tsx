import Image from "next/image";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

interface Product {
  _id: string;
  productName: string;
  photoUrls?: string[];
  price: string;
  description: string;
}
interface ParamsProps {
  view?: string | undefined;
}
export default async function ProductLists({
  items,
  searchParams,
}: {
  items: Product[];
  searchParams: Promise<ParamsProps>;
}) {
  const { view } = await searchParams;

  if (!items || items.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div
      className={`${
        view
          ? "space-y-4"
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      }`}
    >
      {items.map((item) => (
        <div
          className={`border p-4 rounded-2xl ${
            view ? "flex justify-between" : ""
          }`}
          key={item._id}
        >
          {item.photoUrls?.[0] && (
            <div
              className={` relative -z-10 ${view ? "w-1/3" : "w-full h-64"}`}
            >
              <Image
                className="object-contain"
                fill
                src={item.photoUrls[0]}
                alt={item.productName}
              />
            </div>
          )}
          <div className={`${view ? "w-2/3 flex flex-col" : ""}`}>
            <div className={`${view && "grow"}`}>
              <h3 className=" font-medium">{item.productName}</h3>
              <h4 className="text-[#3D9958] font-medium flex items-center mt-3 gap-0.5">
                {item.price}.00 <FaBangladeshiTakaSign />{" "}
              </h4>
              {/* description */}
              {view && (
                <>
                  <div className="border-t mt-3 py-3">
                    <p className="line-clamp-3">{item.description}</p>
                  </div>
                </>
              )}
            </div>

            {/* all buttons */}
            <div>
              <button className="size-8 flex justify-center cursor-pointer rounded-full border items-center text-[#3D9958] hover:text-white hover:bg-[#3D9958]">
                <FaShoppingCart />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
