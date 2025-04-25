"use client";
import React from "react";
import clsx from "clsx";
import { MdClose } from "react-icons/md";
import { TfiLayoutLineSolid } from "react-icons/tfi";
export default function CartMenu({
  toggleCart,
  setToggleCart,
  data,
}: {
  toggleCart: boolean;
  setToggleCart: (val: boolean) => void;
}) {
  const handleClose = () => setToggleCart(false);
  console.log(data);
  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-black/40 transition-opacity duration-300 z-40",
          {
            "opacity-100 pointer-events-auto": toggleCart,
            "opacity-0 pointer-events-none": !toggleCart,
          }
        )}
        onClick={handleClose}
      />

      {/* Slide-in Cart Menu */}
      <div
        className={clsx(
          "fixed inset-y-0  right-0 z-50 md:w-[50%] lg:w-[30%] bg-white shadow-lg transform transition-all duration-500",
          {
            "translate-x-0 opacity-100": toggleCart,
            "translate-x-full opacity-0 pointer-events-none": !toggleCart,
          }
        )}
      >
        <div className="relative px-7">
          <div
            className="flex  justify-between items-center  py-6
         "
          >
            <h2 className="text-2xl font-medium ">Basket ({data.length})</h2>
          </div>

          <div className="border-t pt-4">Cart content goes here...</div>
          <button
            onClick={handleClose}
            className="cursor-pointer absolute top-0 bg-green-900 flex justify-center items-center size-10 text-white right-0 "
          >
            <MdClose size={30} />
          </button>
        </div>
      </div>
    </>
  );
}
