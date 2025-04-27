"use client";

import QuantityBtn from "@/components/cart/QuantityBtn";
import ProceedToPay from "@/components/ProceedToPay";
import ContainerSmall from "@/components/shared/max-w-container/ContainerSmall";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import { useCart } from "@/Hook/useCart";
import useFetch from "@/Hook/useFetch";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { TbAlertHexagonFilled } from "react-icons/tb";
interface DeliveryInfo {
  fullName: string;
  phoneNumber: string;
  address: string;
  houseDetails: string;
  area: string;
  landmark: string;
  city: string;
  region: string;
}

type FormData = {
  fullName: string;
  region: string;
  phoneNumber: string;
  city: string;
  houseDetails: string;
  area: string;
  landmark: string;
  address: string;
};
type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  photo: string;
};
type CartData = {
  cart: CartItem[];
  totalQuantity: number;
};
export default function Checkout() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [formLoad, setFormLoad] = useState(false);
  const { data, isLoading } = useCart() as {
    data: CartData;
    isLoading: boolean;
  };
  const {
    data: dInfo,
    loading,
    refetch,
  } = useFetch<DeliveryInfo>("/api/cart/deliveryinfo");
  if (isLoading || loading)
    return (
      <div className="p-4">
        <LoadingSpinner />
      </div>
    );
  if (!data || !data.cart || data.cart.length === 0) {
    return (
      <ContainerSmall>
        <div className="p-4 flex items-center gap-1.5 mt-4 bg-[#F2F2F2] text-[#D18A18]">
          <TbAlertHexagonFilled />
          Your cart is empty.
        </div>
        <div className="my-10 flex justify-center">
          <Link
            href={"/marketplace"}
            className="bg-green-700 rounded-full py-3 px-6 text-white"
          >
            Return To Shop
          </Link>
        </div>
      </ContainerSmall>
    );
  }
  const onSubmit = async (data: FormData) => {
    setFormLoad(true);
    try {
      await axios.post("/api/cart/deliveryinfo", { data });
      reset();
      toast.success("Delivery information added successfully");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("failed please try again");
    } finally {
      setFormLoad(false);
    }
  };
  const total = data?.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <ContainerSmall className="bg-white flex flex-col lg:flex-row justify-between gap-15 my-6">
      <div className="lg:w-[68%]">
        {/* form */}
        {dInfo ? (
          <>
            <div className="space-y-4 p-4 bg-[#EFF0F4]">
              <h3 className="text-2xl font-semibold">Shipping & Billing</h3>

              <div className=" grid grid-cols-2 capitalize">
                <p>{dInfo.fullName}</p>
                <p>{dInfo.phoneNumber}</p>
                <p>{dInfo.address}</p>
                <p>{dInfo.landmark}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="pb-8">
              <h3 className="text-2xl font-semibold mb-6">
                Delivery Information
              </h3>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="flex flex-col">
                  <label htmlFor="fullName" className="mb-1 font-medium">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    type="text"
                    className="border rounded-full px-4 py-3 focus:outline-none bg-[#F3F5F3] "
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="region" className="mb-1 font-medium">
                    Region
                  </label>
                  <input
                    id="region"
                    {...register("region", { required: "Region is required" })}
                    type="text"
                    className="border rounded-full px-4 py-3 focus:outline-none bg-[#F3F5F3] "
                  />
                  {errors.region && (
                    <p className="text-red-500 text-sm">
                      {errors.region.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phoneNumber" className="mb-1 font-medium">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                    })}
                    type="tel"
                    className="border rounded-full px-4 py-3 focus:outline-none bg-[#F3F5F3] "
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="city" className="mb-1 font-medium">
                    City
                  </label>
                  <input
                    id="city"
                    {...register("city", { required: "City is required" })}
                    type="text"
                    className="border rounded-full px-4 py-3 focus:outline-none bg-[#F3F5F3] "
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="houseDetails" className="mb-1 font-medium">
                    Building / House No / Floor / Street
                  </label>
                  <input
                    id="houseDetails"
                    {...register("houseDetails", {
                      required: "House details are required",
                    })}
                    type="text"
                    className="border rounded-full px-4 py-3 focus:outline-none bg-[#F3F5F3] "
                  />
                  {errors.houseDetails && (
                    <p className="text-red-500 text-sm">
                      {errors.houseDetails.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="area" className="mb-1 font-medium">
                    Area
                  </label>
                  <input
                    id="area"
                    {...register("area", { required: "Area is required" })}
                    type="text"
                    className="border rounded-full px-4 py-3 focus:outline-none bg-[#F3F5F3] "
                  />
                  {errors.area && (
                    <p className="text-red-500 text-sm">
                      {errors.area.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="landmark" className="mb-1 font-medium">
                    Colony / Suburb / Locality / Landmark
                  </label>
                  <input
                    id="landmark"
                    {...register("landmark", {
                      required: "Landmark is required",
                    })}
                    type="text"
                    className="border rounded-full px-4 py-3 focus:outline-none bg-[#F3F5F3] "
                  />
                  {errors.landmark && (
                    <p className="text-red-500 text-sm">
                      {errors.landmark.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="address" className="mb-1 font-medium">
                    Address
                  </label>
                  <input
                    id="address"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    type="text"
                    className="border rounded-full px-4 py-3 focus:outline-none bg-[#F3F5F3] "
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-end">
                  <button
                    disabled={formLoad}
                    type="submit"
                    className="w-full px-20 md:w-fit bg-green-800 text-white font-semibold py-3 rounded-full hover:bg-green-700 transition-colors"
                  >
                    {formLoad ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
        {/* packages */}

        <div className="">
          <h3 className="text-2xl font-semibold mb-6">Packages</h3>

          {isLoading ? (
            <p>Loading packages...</p>
          ) : data.cart && data.cart.length > 0 ? (
            <div className="">
              {data.cart.map((item) => (
                <div
                  className="flex border-b justify-between py-4 border-dashed items-center"
                  key={item.productId}
                >
                  <Link href={`/marketplace/product/${item.productId}`}>
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
                        <h3 className="font-bold pb-2">{item.name}</h3>
                        <h4 className="flex items-center font-semibold text-emerald-700">
                          {item.price}.00 <FaBangladeshiTakaSign />
                        </h4>
                      </div>
                    </div>
                  </Link>
                  <div className="flex items-center gap-7">
                    <QuantityBtn
                      qn={item.quantity}
                      productId={item.productId}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No packages found.</p>
          )}
        </div>
      </div>
      {/* Proceed to Pay */}
      <ProceedToPay dInfo={dInfo ?? null} data={data} total={total} />
    </ContainerSmall>
  );
}
