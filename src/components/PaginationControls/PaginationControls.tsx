"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaginationControls({
  itemCount,
}: {
  itemCount: number;
}) {
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const itemPerPage = 5;
  const totalPages = Math.ceil(itemCount / itemPerPage);
  console.log(page);
  useEffect(() => {
    const param = new URLSearchParams(searchParams.toString());
    if (page) {
      param.set("page", page.toString());
    }
    if (itemPerPage) {
      param.set("limit", itemPerPage.toString());
    }
    const newUrl = `${window.location.pathname}?${param.toString()}`;
    window.history.pushState(null, "", newUrl);
  }, [searchParams, page]);
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
        disabled={page === totalPages}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
