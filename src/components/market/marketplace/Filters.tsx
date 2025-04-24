"use client";

import { useMarketPlace } from "@/context/MarketplaceContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiViewGrid } from "react-icons/hi";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "use-debounce";
import { FaListUl } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
interface HandleViewParams {
  view: "grid" | "list";
}

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { minPrice, maxPrice, category, setCurrentPage } = useMarketPlace();
  const [sortBy, setSortBy] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [text] = useDebounce(searchQuery, 400);
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (text) {
      params.set("search", text);
      params.delete("page");
      setCurrentPage(1);
    } else {
      params.delete("search");
    }
    if (sortBy) {
      params.set("sortBy", sortBy);
    } else {
      params.delete("sortBy");
    }
    if (minPrice) {
      params.set("minPrice", minPrice.toString());
    } else {
      params.delete("minPrice");
    }
    if (maxPrice) {
      params.set("maxPrice", maxPrice.toString());
    } else {
      params.delete("maxPrice");
    }
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [
    searchParams,
    text,
    maxPrice,
    minPrice,
    sortBy,
    category,
    replace,
    pathname,
  ]);

  const handelView = (view: HandleViewParams["view"]): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (view === "list") {
      params.set("view", view);
    } else {
      params.delete("view");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  const activeView = searchParams.get("view")?.toString();
  return (
    <div className="my-4 flex justify-between">
      <select
        defaultValue={searchParams.get("sortBy")?.toString()}
        onChange={(e) => setSortBy(e.target.value)}
        className=" hover:border-[#0D401C] text-md bg-[#F3F5F3] py-3.5 px-5 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0D401C]"
      >
        <option value="">Date: Newest on Top</option>
        <option value="date-old">Date: Oldest on Top</option>
        <option value="price-high">Price: High to Low</option>
        <option value="price-low">Price: Low to High</option>
      </select>
      <div className="max-w-[300px] relative">
        <input
          type="search"
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border bg-[#F3F5F3] px-5 py-3.5 w-full rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
          placeholder="Search..."
        />
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex justify-center items-center size-8 bg-green-700 text-white rounded-full">
          <IoSearch size={20} />
        </div>
      </div>
      {/* grid and list  */}
      <div className="flex gap-2">
        <button
          onClick={() => handelView("grid")}
          data-tooltip-id="grid-tooltip"
          data-tooltip-content={"Grid"}
          data-tooltip-place="left"
          className="size-12 bg-[#0D401C] flex rounded-full cursor-pointer items-center justify-center"
        >
          <HiViewGrid
            className={`${!activeView ? "text-[#FFBB05]" : "text-white"}`}
            size={25}
          />
        </button>
        <Tooltip id="grid-tooltip" />
        <button
          onClick={() => handelView("list")}
          data-tooltip-id="list-tooltip"
          data-tooltip-content={"List"}
          data-tooltip-place="right"
          className="size-12 bg-[#0D401C] flex rounded-full cursor-pointer items-center justify-center"
        >
          <FaListUl
            className={`${activeView ? "text-[#FFBB05]" : "text-white"}`}
            size={20}
          />
        </button>
        <Tooltip id="list-tooltip" />
      </div>
    </div>
  );
}
