import ContainerSmall from "@/components/shared/max-w-container/ContainerSmall";
import React from "react";
import { IoSearch } from "react-icons/io5";

export default function SupplyMarket() {
  return (
    <ContainerSmall className="flex">
      <aside>
        <div>
          <h3>Filter by price</h3>
          <input max={1000} min={0} type="range" name="" id="" />
        </div>
      </aside>
      <div className="w-full">
        <section className="flex justify-between items-center">
          <div>
            <select className="border px-2.5 py-3" name="sort" id="">
              <option value="">Date: Newest on Top</option>
              <option value="">Date: Oldest on Top</option>
              <option value="">Price: High to Low</option>
              <option value="">Price: Low to High</option>
            </select>
          </div>
          <div className="max-w-[300px] relative">
            <input
              type="search"
              className="border px-4 rounded-full w-full py-2"
              placeholder="Search..."
            />
            <div className="absolute right-1.5 top-1.5 flex justify-center items-center size-8 bg-[#FFC800] rounded-full">
              <IoSearch size={25} />
            </div>
          </div>
        </section>
      </div>
    </ContainerSmall>
  );
}
