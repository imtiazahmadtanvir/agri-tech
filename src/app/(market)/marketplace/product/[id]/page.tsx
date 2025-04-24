import ImageSlider from "@/components/market/marketplace/ImageSlider";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { FaBangladeshiTakaSign, FaCartShopping } from "react-icons/fa6";
import { BsBoxSeamFill } from "react-icons/bs";
import ShareButtons from "@/components/market/marketplace/ShareButtons";
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resParams = await params;
  const { id } = resParams;
  try {
    const res = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/listings/${id}`
    );
    const {
      productName,
      price,
      description,
      photoUrls,
      category,
      tags,
      unit,
      stock,
    } = await res.data;
    return (
      <div className="flex gap-20 mb-24 mt-6">
        <div className="w-2/5">
          <ImageSlider data={photoUrls} />
        </div>
        <div className="w-3/5">
          {/* Button*/}
          <div>
            <button>BACK TO SHOP</button>
          </div>
          {/* info */}
          <div className="mt-7">
            <h2 className="text-2xl font-medium">{productName}</h2>
            {/* Rating */}
            {/* price */}
            <h4 className="text-[#3D9958] font-medium flex items-center mt-3 gap-0.5">
              {price}.00 <FaBangladeshiTakaSign />{" "}
            </h4>
            <p className="text-[#6E7673] py-6 font-nunito">{description}</p>
            <div className="flex items-center gap-1.5">
              <BsBoxSeamFill className="text-[#FF9500]" />
              <span className="text-[#6E7673] capitalize font-semibold">
                Available:{stock} <span className="capitalize">{unit}</span> in
                stock
              </span>
            </div>
            {/* add cart */}
            <div className="flex gap-2 my-6">
              <input
                defaultValue={1}
                className="bg-[#E0E6E2] w-16 py-3 rounded-2xl px-3  outline-none"
                type="number"
              />

              <button className="pl-4 bg-green-900 py-1 rounded-full text-white cursor-pointer flex items-center gap-2">
                Add To Cart{" "}
                <span className="size-9 flex items-center justify-center rounded-full bg-yellow-500 mr-2">
                  <FaCartShopping className="text-green-900" />
                </span>
              </button>
            </div>
            {/* other info */}
            <div className="font-nunito space-y-1.5 text-[#6E7673]">
              <p>Category: {category}</p>
              <p>
                Tags:
                {tags.length > 0 && (
                  <span className="uppercase pl-0.5">{tags.join(" / ")}</span>
                )}
              </p>
              {/* share button */}
              <ShareButtons />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return (
      <div className="p-6 h-[65vh] text-center text-red-600">
        <h1 className="text-xl font-bold">😔 Something went wrong</h1>
        <p>Failed to load the product. Please try again later.</p>
        <Link
          href="/marketplace"
          className="text-blue-500 underline mt-4 inline-block"
        >
          ← Back to Products
        </Link>
      </div>
    );
  }
}
