"use client";
import React, { useEffect } from "react";
import clsx from "clsx";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import QuantityBtn from "../cart/QuantityBtn";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import CheckoutBtn from "../cart/CheckoutBtn";

type DataType = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
};

export default function CartMenu({
  toggleCart,
  setToggleCart,
  data,
}: {
  toggleCart: boolean;
  data: DataType[];
  setToggleCart: (val: boolean) => void;
}) {
  const handleClose = () => setToggleCart(false);

  // Disable body scroll when cart is open
  useEffect(() => {
    if (toggleCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [toggleCart]);

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
          "fixed inset-y-0 w-full right-0 z-50 md:w-[60%] lg:w-[30%] bg-white shadow-lg transform transition-all duration-500",
          {
            "translate-x-0 opacity-100": toggleCart,
            "translate-x-full opacity-0 pointer-events-none": !toggleCart,
          }
        )}
      >
        <div className="relative px-7 overflow-y-auto max-h-screen pb-20">
          <div className="flex justify-between items-center py-6">
            <h2 className="text-2xl font-medium">Basket ({data.length})</h2>
          </div>

          <div className="border-t pt-4 h-[75vh]">
            {data.map((item) => (
              <div
                className="flex border-b justify-between py-4 border-dashed items-center"
                key={item?.productId}
              >
                <div className="flex gap-4 items-center">
                  <div className="border rounded-2xl overflow-hidden">
                    <Image
                      height={70}
                      width={70}
                      alt={item.name}
                      src={item.photo}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold pb-2">{item?.name}</h3>
                    <h4 className="flex items-center font-semibold text-emerald-700">
                      {item?.price}.00 <FaBangladeshiTakaSign />
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-7">
                  <QuantityBtn qn={item.quantity} />
                  <IoMdClose size={20} />
                </div>
              </div>
            ))}
          </div>

          <CheckoutBtn data={data} />

          <button
            onClick={handleClose}
            className="cursor-pointer absolute top-0 bg-green-900 flex justify-center items-center size-10 text-white right-0"
          >
            <MdClose size={30} />
          </button>
        </div>
      </div>
    </>
  );
}
