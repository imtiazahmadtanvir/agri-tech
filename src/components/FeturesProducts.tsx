import React from "react";
import ContainerSmall from "./shared/max-w-container/ContainerSmall";
import Image from "next/image";

interface Product {
  _id: string;
  productName: string;
  price: number;
  unit: string;
  photoUrls: string[];
}

export default async function FeturesProducts() {
  try {
    const products: Product[] = [];

    return (
      <ContainerSmall className="mt-20 mb-20">
        {/* Title and View All Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-3xl">Featured Product</h2>
          <button className="border-b-2 border-[#F8C32C]">
            View All Featured Products
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <div key={product._id} className="bg-white  ">
              <div className="w-full h-48 overflow-hidden rounded-lg border">
                <Image
                  src={product.photoUrls[0]}
                  alt={product.productName}
                  width={300}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                {product.productName}
              </h3>
              <p className="text-green-700 font-bold">
                {product.price} ৳ / {product.unit}
              </p>
            </div>
          ))}
        </div>
      </ContainerSmall>
    );
  } catch (error) {
    console.error("Error in FeturesProducts component:", error);
    return (
      <div className="text-red-500 text-center py-10">
        Error loading featured products.
      </div>
    );
  }
}
