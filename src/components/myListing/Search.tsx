"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
export default function Search() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [query] = useDebounce(text, 500);
  useEffect(() => {
    if (!query) {
      router.push(`/marketplace/myListing`);
    } else {
      router.push(`/marketplace/myListing?search=${query}`);
    }
  }, [query, router]);
  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search your listings"
        className="border px-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        type="text"
      />
    </div>
  );
}
