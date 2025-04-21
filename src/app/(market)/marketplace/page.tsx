import { timeAgeCalculator } from "@/utils/timeCalculate";
import { FormData } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Filters from "@/components/market/marketplace/Filters";
import PaginationControls from "@/components/PaginationControls/PaginationControls";
import AllProducts from "@/components/market/marketplace/AllProducts";

interface SearchParams {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  location?: string;
  category?: string;
  page: string;
  limit: string;
}

export default async function MarketplaceMain({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const param = await searchParams;
  const itemCount = 10;
  return (
    <div className="my-4">
      <div>
        <Filters />
      </div>
      <AllProducts param={param} />
      <PaginationControls itemCount={itemCount} />
    </div>
  );
}
