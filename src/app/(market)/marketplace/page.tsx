import Filters from "@/components/market/marketplace/Filters";
import ProductLists from "@/components/market/marketplace/ProductLists";
import { Suspense } from "react";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import PaginationControls from "@/components/PaginationControls/PaginationControls";
import axios from "axios";

interface SearchParams {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  location?: string;
  category?: string;
  page: string;
  limit: string;
  view?: string | undefined;
}

export default async function MarketplaceMain({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const param = await searchParams;
  const { category, search, maxPrice, minPrice, sortBy, page } = param;
  let items = [];
  let totalPages = 0;
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/listings`, {
      params: {
        category: category || "",
        search,
        maxPrice,
        minPrice,
        sortBy,
        page,
      },
    });
    items = res.data.data;
    totalPages = res.data.totalPages;
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="my-4">
      <div>
        <Filters />
      </div>
      <Suspense key={JSON.stringify(param)} fallback={<LoadingSpinner />}>
        <div className="min-h-screen">
          <ProductLists searchParams={searchParams} items={items} />
        </div>
      </Suspense>
      <PaginationControls totalPages={totalPages} />
    </div>
  );
}
