"use client";

import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { productCategories } from "@/lib/productCategory";
import { useMarketPlace } from "@/context/MarketplaceContext";
import { FiArrowRight } from "react-icons/fi";
import { useDebounce } from "use-debounce";

export default function Sidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { setCategory, setMaxPrice, setMinPrice } = useMarketPlace();
  const category = searchParams.get("category")?.toString();

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [error, setError] = useState("");
  const [maxDebounce] = useDebounce(max, 300);
  useEffect(() => {
    const minVal = parseFloat(min) || 1;
    const maxVal = parseFloat(maxDebounce);
    if (maxDebounce) {
      if (minVal >= maxVal) {
        setError("Min price must be less than Max price");
      } else {
        setError("");
        setMinPrice(min);
        setMaxPrice(maxDebounce);
      }
    } else {
      setMinPrice("");
      setMaxPrice("");
      setError("");
    }
  }, [min, max, setMinPrice, setMaxPrice, maxDebounce]);

  const handleReset = () => {
    setMin("");
    setMax("");
    setMinPrice("");
    setMaxPrice("");
    setError("");
  };
  const handelAllProduct = () => {
    const params = new URLSearchParams(searchParams.toString());
    setCategory("");
    params.delete("category");
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <aside className="h-fit sticky mt-4 top-0 left-0">
      {/* Category Section */}
      <div className="border rounded-2xl">
        <h3 className="bg-[#0D401C] text-lg rounded-t-2xl border py-3.5 text-white border-[#0D401C] font-bold px-5">
          Categories
        </h3>
        <div className="flex px-6 pb-1 flex-col text-left">
          <button
            onClick={handelAllProduct}
            className={`group cursor-pointer py-3.5 px-2 text-left w-full hover:pl-6 border-dashed 
              hover:text-green-700 
              ${category ? "" : "text-green-700 pl-6"}
              transition-all duration-300  border-b`}
          >
            <span className="relative">
              <span
                className={`absolute left-[-20px] opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:-translate-x-1 transition-all translate-y-1 duration-300 text-[#F8C32C] ${
                  category ? "" : "opacity-100 -translate-x-1"
                }`}
              >
                <FiArrowRight />
              </span>
              All Product
            </span>
          </button>

          {productCategories.map((item) => (
            <button
              key={item.id}
              onClick={() => setCategory(item.name)}
              className={`group cursor-pointer py-3.5 px-2 text-left w-full border-dashed 
                hover:pl-6
                hover:text-green-700  
                ${category === item.name ? "text-green-700 pl-6" : ""} 
                transition-all duration-300 ${item.id !== 10 && "border-b"}`}
            >
              <span className="relative">
                <span
                  className={`absolute left-[-20px] opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:-translate-x-1 transition-all translate-y-1 duration-300 text-[#F8C32C] ${
                    category === item.name ? "opacity-100 -translate-x-1" : ""
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
      <div className="border pb-5 rounded-2xl mt-6">
        <h4 className="bg-[#0D401C] text-lg rounded-t-2xl border py-3.5 text-white border-[#0D401C] font-bold px-5">
          Filter by Price
        </h4>
        <div className="px-7 pt-6 flex items-center gap-2">
          <input
            type="number"
            placeholder="min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="border w-full border-gray-300 rounded px-2 py-1 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <p>To</p>
          <input
            type="number"
            placeholder="max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="border w-full border-gray-300 rounded px-2 py-1 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            onClick={handleReset}
            className="bg-gray-300 text-black px-2 py-1 rounded cursor-pointer flex items-center gap-1"
          >
            <RotateCcw size={18} />
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-center text-xs px-7">{error}</p>
        )}
      </div>

      {/* Popular Products Placeholder */}
      {/* <div className="mt-6 border rounded-2xl">
        <h4 className="bg-[#0D401C] text-lg rounded-t-2xl border py-3.5 text-white border-[#0D401C] font-bold px-5">
          Popular Products
        </h4>
        <div className="px-7 pb-3"></div>
      </div> */}
    </aside>
  );
}
