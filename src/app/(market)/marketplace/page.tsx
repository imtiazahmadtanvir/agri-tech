import Filters from "@/components/market/marketplace/Filters";
import ProductLists from "@/components/market/marketplace/ProductLists";
import { Suspense } from "react";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import PaginationControls from "@/components/PaginationControls/PaginationControls";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

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

type QueryType = {
  price?: {
    $gte?: number;
    $lte?: number;
  };
  category?: string;
  productName?: {
    $regex: string;
    $options: string;
  };
};

export default async function MarketplaceMain({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const param = await searchParams;
  const { category, search, maxPrice, minPrice, sortBy, page } = param;
  let items: any[] = [];
  let totalPages = 0;

  try {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = 9;
    const skipNum = (pageNum - 1) * limitNum;
    const query: QueryType = {};

    if (category) {
      query.category = category;
    }

    let sortOption: any = {};
    if (!sortBy) {
      sortOption = { listed: -1 };
    } else if (sortBy === "date-old") {
      sortOption = { listed: 1 };
    } else if (sortBy === "price-high") {
      sortOption = { price: -1 };
    } else if (sortBy === "price-low") {
      sortOption = { price: 1 };
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (minPrice) {
      query.price = { $gte: parseFloat(minPrice) };
    } else if (maxPrice) {
      query.price = { $lte: parseFloat(maxPrice) };
    }

    if (search) {
      query.productName = { $regex: search, $options: "i" };
    }

    const listingsCollection = await dbConnect(collectionNameObj.listingsCollection);
    const total = await listingsCollection.countDocuments(query);
    const result = await listingsCollection
      .find(query)
      .sort(sortOption)
      .skip(skipNum)
      .limit(limitNum)
      .toArray();

    // Map MongoDB ObjectId to string for safe prop serialization
    items = result.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
    totalPages = Math.ceil(total / limitNum);
  } catch (error) {
    console.error("Direct db query error in marketplace:", error);
  }
  return (
    <div className="py-2 pb-16 flex flex-col gap-6">
      <div>
        <Filters />
      </div>
      <Suspense key={JSON.stringify(param)} fallback={<LoadingSpinner />}>
        <div className="min-h-[60vh]">
          <ProductLists searchParams={searchParams} items={items} />
        </div>
      </Suspense>
      <div className="pt-4 border-t border-gray-100">
        <PaginationControls totalPages={totalPages} />
      </div>
    </div>
  );
}
