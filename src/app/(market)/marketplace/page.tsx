import Filters from "@/components/market/marketplace/Filters";
import ProductLists from "@/components/market/marketplace/ProductLists";
import { Suspense } from "react";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";

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

  return (
    <div className="my-4">
      <div>
        <Filters />
      </div>
      <Suspense key={JSON.stringify(param)} fallback={<LoadingSpinner />}>
        <ProductLists param={param} />
      </Suspense>
    </div>
  );
}
