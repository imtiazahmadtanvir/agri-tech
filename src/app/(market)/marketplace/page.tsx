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
  const { category, search, maxPrice, minPrice, sortBy } = param;
  let items = [];
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/listings`, {
      params: {
        category: category || "",
        search,
        maxPrice,
        minPrice,
        sortBy,
      },
    });
    items = res.data.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="my-4">
      <div>
        <Filters />
      </div>
      <Suspense key={JSON.stringify(param)} fallback={<LoadingSpinner />}>
        <ProductLists searchParams={searchParams} items={items} />
      </Suspense>
      <PaginationControls itemCount={0} />
    </div>
  );
}
