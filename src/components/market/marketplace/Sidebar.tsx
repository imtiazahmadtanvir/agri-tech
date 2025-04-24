"use client";

import { productCategories } from "@/lib/productCategory";
import { FiArrowRight } from "react-icons/fi";
import { useMarketPlace } from "@/context/MarketplaceContext";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { SquarePlay } from "lucide-react";
interface Inputs {
  min: number | string;
  max: number | string;
}
export default function Sidebar() {
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { setCategory, setMaxPrice, setMinPrice } = useMarketPlace();
  const category = searchParams.get("category")?.toString();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.min) {
      setMinPrice(data.min);
    }
    if (data.max) {
      setMaxPrice(data.max);
    }
  };
  const maxPrice = watch("max");
  return (
    <aside className="h-fit sticky mt-4 top-0 left-0">
      <div className="border rounded-2xl">
        <h3 className="bg-[#0D401C] text-lg rounded-t-2xl border py-3.5 text-white border-[#0D401C] font-bold px-5">
          Categories
        </h3>
        <div className="flex px-7 pb-3 flex-col text-left">
          <button
            onClick={() => setCategory("")}
            className={`group cursor-pointer py-4 px-2 text-left w-full border-dashed 
              hover:text-green-700 
              ${category ? "" : "text-green-700"}
              transition-all duration-300  border-b`}
          >
            <span className="relative">
              <span
                className={`absolute left-[-20px] opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all translate-y-1 duration-300 text-[#F8C32C] ${
                  category ? "" : "opacity-100 translate-x-1"
                }`}
              >
                <FiArrowRight />
              </span>
              All Product
            </span>
          </button>
          {productCategories.map((item) => (
            <button
              onClick={() => setCategory(item.name)}
              className={`group cursor-pointer py-4 px-2 text-left w-full border-dashed 
              hover:text-green-700  
              ${category === item.name ? "text-green-700" : ""} 
              transition-all duration-300 ${item.id !== 10 && "border-b"}`}
              key={item.id}
            >
              <span className="relative">
                <span
                  className={`absolute left-[-20px] opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all translate-y-1 duration-300 text-[#F8C32C] ${
                    category === item.name ? "opacity-100 translate-x-1" : ""
                  }`}
                >
                  <FiArrowRight />
                </span>
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter Section */}
      <div className="border rounded-2xl mt-6">
        <h4 className="bg-[#0D401C] text-lg rounded-t-2xl border py-3.5 text-white border-[#0D401C] font-bold px-5">
          Filter by Price
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-7 py-6 flex items-center  gap-2"
        >
          <div className="">
            <input
              id="minPrice"
              placeholder="min"
              type="number"
              {...register("min", {
                required: "Minimum price is required",
                validate: (value) =>
                  parseFloat(value.toString()) <
                    parseFloat(maxPrice?.toString()) ||
                  "Min price must be less than Max price",
              })}
              className="border w-full border-gray-300 rounded px-2 py-1"
            />
            {errors.min && (
              <span className="text-red-500 text-xs">{errors.min.message}</span>
            )}
          </div>
          <p>To</p>
          <div className="">
            <input
              type="number"
              placeholder="max"
              {...register("max", { required: "Maximum price is required" })}
              className="border w-full border-gray-300 rounded px-2 py-1"
            />
            {errors.max && (
              <span className="text-red-500 text-xs">{errors.max.message}</span>
            )}
          </div>
          <div>
            <button
              className="bg-green-800 rounded cursor-pointer"
              type="submit"
            >
              <SquarePlay className="text-white" size={32} />
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 border rounded-2xl">
        <h4 className="bg-[#0D401C] text-lg rounded-t-2xl border py-3.5 text-white border-[#0D401C] font-bold px-5">
          Popular Products
        </h4>
        <div className="px-7 pb-3"></div>
      </div>
    </aside>
  );
}
