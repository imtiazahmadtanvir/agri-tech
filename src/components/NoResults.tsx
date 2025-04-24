"use client";

import { useRouter } from "next/navigation";

export default function NoResults() {
  const router = useRouter();

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center py-16">
      <svg
        className="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 48 48"
      >
        <circle cx="24" cy="24" r="20" strokeWidth="4" />
        <path d="M16 20h16M16 28h8" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <h2 className="text-xl font-semibold mb-2">No products found</h2>
      <p className="text-gray-500 mb-4">
        Try adjusting your search or filter to find what you&apos;re looking
        for.
      </p>
      <button
        className="px-4 py-2 bg-green-600 text-white cursor-pointer rounded-full"
        onClick={() => router.push("/marketplace")}
      >
        Browse All Products
      </button>
    </div>
  );
}
