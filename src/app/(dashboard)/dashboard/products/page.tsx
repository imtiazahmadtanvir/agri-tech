"use client";

import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { CiExport } from "react-icons/ci";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { Product } from "@/types/type";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("/api/my-listing");
        setProducts(res.data.data); // assuming your response has { data: [...] }
      } catch (err) {
        console.error("Failed to fetch listings", err);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="rounded-xl bg-white shadow">
      {/* filter */}
      <div className="px-4 py-2">
        <h3 className="text-xl font-semibold">Filter</h3>
        <div className="flex justify-between py-3">
          <select className="border rounded-md px-3 py-1.5">
            <option value="">Status</option>
            <option value="pending">Pending</option>
          </select>
          <div>
            <select className="border rounded-md px-3 py-1.5">
              <option value="">Category</option>
              <option value="vegetables">Vegetables</option>
            </select>
          </div>
          <div>
            <select className="border rounded-md px-3 py-1.5">
              <option value="">Stock</option>
              <option value="inStock">In Stock</option>
              <option value="outStock">Out Of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* search */}
      <div className="flex border-t border-b px-4 justify-between py-2">
        <div>
          <input
            className="border px-4 py-2 rounded-full"
            type="search"
            placeholder="Search Product"
          />
        </div>
        <div className="flex gap-4">
          <button className="flex items-center shadow rounded-md px-2.5 py-2 bg-white font-semibold">
            <CiExport /> Export
          </button>
          <Link
            href={"/dashboard/products/addProduct"}
            className="flex items-center shadow rounded-md px-2.5 py-2 bg-white font-semibold"
          >
            <GoPlus /> Add Product
          </Link>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-gray-300">
          <thead className="bg-green-100 text-left">
            <tr>
              <th className="px-4 py-2 border-b">Product Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Stock</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-green-50">
                  <td className="px-4 py-2 border-b flex items-center gap-2">
                    <Image
                      width={40}
                      height={40}
                      src={product.photoUrls[0]}
                      alt={product.productName}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span>{product.productName}</span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    {product.category || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    ৳{product.discountedPrice || product.price}/
                    {product.unit || "unit"}
                  </td>
                  <td className="px-4 py-2 border-b">{product.stock || 0}</td>
                  <td className="px-4 py-2 border-b">
                    {product.verifyStatus ? (
                      <span className="text-green-600 font-medium">
                        Approved
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-medium">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-4 text-center" colSpan={6}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
