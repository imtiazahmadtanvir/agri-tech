import ImageSlider from "@/components/market/marketplace/ImageSlider";
import axios from "axios";
import Link from "next/link";
import React from "react";

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
      <div className="flex gap-6 mt-6">
        <div className="w-2/5">
          <ImageSlider data={photoUrls} />
        </div>
        <div className="w-3/5">
          {/* Button*/}
          <div>
            <button>BACK TO SHOP</button>
          </div>
          {/* info */}
          <div>
            <h2>{productName}</h2>
            {/* Rating */}
            {/* price */}
            <h4>{price}</h4>
            <p>{description}</p>
            <div>
              <span>
                Available:{stock} {unit} in stock
              </span>
            </div>
            {/* add cart */}
            <div>
              <input type="number" />
              <button>Add To Cart</button>
            </div>
            {/* other info */}
            <p>Category: {category}</p>
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
