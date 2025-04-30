"use client";

import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { CiExport } from "react-icons/ci";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { Product } from "@/types/type";
import { productCategories } from "@/lib/productCategory";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("/api/my-listing");
        setProducts(res.data.data);
      } catch (err) {
        console.error("Failed to fetch listings", err);
      }
    };
    fetchListings();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      !categoryFilter || product.category === categoryFilter;

    const matchesStock =
      !stockFilter ||
      (stockFilter === "in" && Number(product.stock) > 0) ||
      (stockFilter === "out" && Number(product.stock) <= 0);

    const matchesStatus =
      !statusFilter ||
      (statusFilter === "approved" && product.verifyStatus) ||
      (statusFilter === "pending" && !product.verifyStatus);

    return matchesSearch && matchesCategory && matchesStock && matchesStatus;
  });

  return (
    <div className="rounded-xl bg-white shadow">
      {/* Filter Section */}
      <div className="px-4 py-2">
        <h3 className="text-xl font-semibold">Filter</h3>
        <div className="flex flex-col md:flex-row gap-4 py-3">
          <select
            className="border rounded-md px-3 py-1.5"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>

          <select
            className="border rounded-md px-3 py-1.5"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {productCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded-md px-3 py-1.5"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="">All Stock</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Search + Buttons */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-b px-4 py-3">
        <input
          className="border px-4 py-2 rounded-full w-full md:w-1/2"
          type="search"
          placeholder="Search Product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-4">
          <Link
            href={"/dashboard/products/addProduct"}
            className="flex items-center shadow rounded-md px-3 py-2 bg-white font-semibold"
          >
            <GoPlus className="mr-1" /> Add Product
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-gray-300 min-w-[600px]">
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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
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
                  No matching products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
