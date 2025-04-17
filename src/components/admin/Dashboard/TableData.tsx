"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import ProductModal from "../modal/ProductModal";
interface Item {
  _id: string;
  productName: string;
  category: string;
  price: number;
  location: string;
  phoneNumber: string;
  listed: string;
  verifyStatus: boolean;
  userName: string;
  photos: string[];
}
export default function TableData({ item }: { item: Item }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <tr
        className="hover:bg-gray-200 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <td>
          <Image
            src={item.photos[0] || ""}
            alt={item.productName}
            height={60}
            width={60}
          />
        </td>
        <td className="px-4 py-2">{item.productName}</td>
        <td className="px-4 py-2">{item.category}</td>
        <td className="px-4 py-2">{item.price} ৳</td>
        <td className="px-4 py-2">{item.userName}</td>
        <td className="px-4 py-2">
          <span
            className={`inline-block px-2 py-1 rounded text-xs ${
              item.verifyStatus
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {item.verifyStatus ? "Accepted" : "Pending"}
          </span>
        </td>
        <td className="px-4 space-x-2 py-2">
          <span
            onClick={(e) => e.stopPropagation()}
            className="relative group inline-block"
          >
            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
              <IoCheckmarkSharp size={18} />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:inline-block bg-black text-white text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
              Accept
            </span>
          </span>
          <span
            onClick={(e) => e.stopPropagation()}
            className="relative group inline-block"
          >
            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
              <IoClose size={18} />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:inline-block bg-black text-white text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
              Reject
            </span>
          </span>
        </td>
      </tr>
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
