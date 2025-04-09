"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handelSearch = useDebouncedCallback((test) => {
    const params = new URLSearchParams(searchParams);
    if (test) {
      params.set("search", test);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);
  return (
    <div>
      <input
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => handelSearch(e.target.value)}
        placeholder="Search your listings"
        className="border px-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        type="text"
      />
    </div>
  );
}
