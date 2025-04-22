"use client";
import { GoPlus } from "react-icons/go";
import { CiExport } from "react-icons/ci";
import Link from "next/link";

export default function Products() {
  return (
    <div className="rounded-xl bg-white shadow">
      {/* filter */}
      <div className="px-4 py-2">
        <h3 className="text-xl font-semibold">Filter</h3>
        <div className="flex justify-between py-3">
          <select className="border rounded-md px-3 py-1.5" name="" id="">
            <option value="">Status</option>
            <option value="pending">Pending</option>
            <option value=""></option>
            <option value="">Status</option>
          </select>
          <div>
            <select className="border rounded-md px-3 py-1.5" name="" id="">
              <option value="">Category</option>
              <option value="pending">Pending</option>
              <option value=""></option>
              <option value="">Status</option>
            </select>
          </div>
          <div>
            <select className="border rounded-md px-3 py-1.5" name="" id="">
              <option value="">Stock</option>
              <option value="inStock">In Stuck</option>
              <option value="">Out Of Stuck</option>
            </select>
          </div>
        </div>
      </div>
      {/* search */}
      <div className="flex  border-t border-b px-4 justify-between py-2 ">
        <div>
          <input
            className="border  px-4 py-2 rounded-full"
            type="search"
            name=""
            id=""
            placeholder="search Product"
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
      {/* table here */}
      <div className="overflow-x-auto ">
        <table className="table-auto w-full  border-gray-300 ">
          <thead className="bg-green-100 text-left rounded-2xl">
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
            <tr className="hover:bg-green-50">
              <td className="px-4 py-2 border-b">Tomato</td>
              <td className="px-4 py-2 border-b">Vegetables</td>
              <td className="px-4 py-2 border-b">৳30/kg</td>
            </tr>
            <tr className="hover:bg-green-50">
              <td className="px-4 py-2 border-b">Mango</td>
              <td className="px-4 py-2 border-b">Fresh Fruits</td>
              <td className="px-4 py-2 border-b">৳120/kg</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
