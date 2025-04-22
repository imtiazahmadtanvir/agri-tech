import React from "react";
import { GoPlus } from "react-icons/go";
import { CiExport } from "react-icons/ci";
export default function page() {
  return (
    <div className="rounded-xl bg-white shadow">
      <div className="flex px-4 justify-between py-2 ">
        <div>
          <input
            className="border px-4 py-2 rounded-full"
            type="search"
            name=""
            id=""
          />
        </div>
        <div className="flex gap-4">
          <button className="flex items-center shadow rounded-md px-2.5 py-2 bg-white font-semibold">
            <CiExport /> Export
          </button>
          <button className="flex items-center shadow rounded-md px-2.5 py-2 bg-white font-semibold">
            <GoPlus /> Add Product
          </button>
        </div>
      </div>
      <div className="overflow-x-auto ">
        <table className="table-auto w-full  border-gray-300 ">
          <thead className="bg-green-100 text-left rounded-2xl">
            <tr>
              <th className="px-4 py-2 border-b">Product Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Price</th>
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
