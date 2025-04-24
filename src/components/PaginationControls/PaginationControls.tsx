"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function PaginationControls({
  itemCount,
}: {
  itemCount: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 3;
  const numberOfPage = Math.ceil(itemCount / itemPerPage);
  const pages = [
    ...Array(numberOfPage)
      .keys()
      .map((i) => i + 1),
  ];
  console.log(pages);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, currentPage, pathname, replace]);

  const handelPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handelNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center gap-4 mt-6">
        {currentPage > 1 && (
          <button
            onClick={handelPrevPage}
            className={`size-12 hover:bg-[#0A4A1C] flex justify-center items-center rounded-full transition-all duration-300 ease-in-out hover:text-white font-medium cursor-pointer bg-[#E2E8E3]`}
          >
            <FaAngleLeft />
          </button>
        )}
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={`size-12 hover:bg-[#0A4A1C] rounded-full transition-all duration-300 ease-in-out hover:text-white font-medium cursor-pointer ${
              currentPage === page ? "bg-[#0A4A1C] text-white" : "bg-[#E2E8E3]"
            }`}
            key={page}
          >
            {page}
          </button>
        ))}
        {currentPage < pages.length && (
          <button
            onClick={handelNextPage}
            className={`size-12 hover:bg-[#0A4A1C] flex justify-center items-center rounded-full transition-all duration-300 ease-in-out hover:text-white font-medium cursor-pointer bg-[#E2E8E3]`}
          >
            <FaAngleRight />
          </button>
        )}
      </div>
    </>
  );
}
