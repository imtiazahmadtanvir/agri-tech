"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaginationControls({
  itemCount,
}: {
  itemCount: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  // const [page, setPage] = useState<number>(1);
  const itemPerPage = 3;
  const numberOfPage = Math.ceil(itemCount / itemPerPage);
  const pages = [
    ...Array(numberOfPage)
      .keys()
      .map((i) => i + 1),
  ];
  console.log(pages);
  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   if (page) {
  //     params.set("page", page.toString());
  //   } else {
  //     params.delete("page");
  //   }
  //   if (itemPerPage) {
  //     params.set("limit", itemPerPage.toString());
  //   } else {
  //     params.delete("limit");
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, [searchParams, page, pathname, replace]);
  return (
    <>
      <div className="flex justify-center items-center gap-4 mt-6">
        {pages.map((page) => (
          <button
            className="size-12 bg-[#E2E8E3] hover:bg-[#0A4A1C] rounded-full transition-all duration-300 ease-in-out hover:text-white font-medium cursor-pointer"
            key={page}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
}
