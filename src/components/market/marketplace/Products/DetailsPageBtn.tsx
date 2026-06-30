"use client";
import { useCart } from "@/Hook/useCart";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoChevronUp } from "react-icons/io5";

export default function DetailsPageBtn({ id }: { id: string }) {
  const { refetch } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const handleAddToCart = async (id: string) => {
    try {
      await axios.post("/api/cart", {
        productId: id,
        quantity,
      });
      toast.success("Added to cart!");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bg-[#E0E6E2] rounded-2xl flex px-2 py-2 items-center">
        <input
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value) || 1)}
          className=" w-8 text-center  outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] focus:outline-none"
          type="number"
        />
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setQuantity((perv) => perv + 1)}
            className="cursor-pointer"
          >
            <IoChevronUp />
          </button>
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="cursor-pointer"
          >
            <IoIosArrowDown />
          </button>
        </div>
      </div>

      <button
        onClick={() => handleAddToCart(id)}
        className="pl-4 h-fit bg-green-900 py-2 rounded-full text-white cursor-pointer flex items-center gap-2"
      >
        Add To Cart
        <span className="size-9 flex items-center justify-center rounded-full bg-yellow-500 mr-2">
          <FaCartShopping className="text-green-900" />
        </span>
      </button>
    </>
  );
}
