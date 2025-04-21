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
  const [page, setPage] = useState<number>(1);
  const itemPerPage = 10;
  const totalPages = Math.ceil(itemCount / itemPerPage);
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (page) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    if (itemPerPage) {
      params.set("limit", itemPerPage.toString());
    } else {
      params.delete("limit");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, page, pathname, replace]);
  return (
    <>
      {(itemCount ?? 0) > itemPerPage && (
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
            onClick={() =>
              setPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
