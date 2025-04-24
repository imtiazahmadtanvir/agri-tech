import NoResults from "@/components/NoResults";
import Image from "next/image";
import Link from "next/link";
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
    return <NoResults />;
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
          className={`border p-4 rounded-2xl hover:shadow-[0_3px_10px_rgba(0,0,0,0.2)] ${
            view ? "flex justify-between" : ""
          }`}
          key={item._id}
        >
          {item.photoUrls?.[0] && (
            <Link
              href={`/marketplace/product/${item._id}`}
              className={`block overflow-hidden ${
                view ? "w-1/3 " : "w-full h-64"
              }`}
            >
              <div className="relative transition-transform duration-300 ease-in-out hover:scale-110 h-full w-full">
                <Image
                  className="object-contain"
                  fill
                  src={item.photoUrls[0]}
                  alt={item.productName}
                />
              </div>
            </Link>
          )}
          <div className={`${view ? "w-2/3 flex flex-col" : ""}`}>
            <div className={`${view && "grow"}`}>
              <Link href={`/marketplace/product/${item._id}`}>
                {" "}
                <h3 className=" font-medium">{item.productName}</h3>
              </Link>

              <h4 className="text-[#3D9958] font-medium flex items-center mt-3 gap-0.5">
                {item.price}.00 <FaBangladeshiTakaSign />{" "}
              </h4>
              {/* description */}
              {view && (
                <>
                  <div className="border-t mt-3 py-3 font-nunito">
                    <p className="line-clamp-3">{item.description}</p>
                  </div>
                </>
              )}
            </div>

            {/* all buttons */}
            <div>
              <button className="size-8 flex justify-center cursor-pointer rounded-full border items-center text-[#3D9958] hover:text-white hover:bg-[#3D9958] transition-all duration-300 ease-in-out">
                <FaShoppingCart />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
