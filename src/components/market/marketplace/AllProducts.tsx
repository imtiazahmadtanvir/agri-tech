import { timeAgeCalculator } from "@/utils/timeCalculate";
import { FormData } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import Filters from "@/components/market/marketplace/Filters";
import PaginationControls from "@/components/PaginationControls/PaginationControls";

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
  const search = param.search || "";
  const minPrice = param.minPrice || 0;
  const maxPrice = param.maxPrice || 100000000;
  const sortBy = param.sortBy || "";
  const location = param.location || "";
  const categories = param.category || "";
  const page = param.page || "1";
  const limit = param.limit || "10";
  let errorMessage = "";
  let items: FormData[] = [];
  let itemCount = 10;

  try {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skipNum = (pageNum - 1) * limitNum;
    const query: QueryType = {};

    if (categories) {
      query.category = categories;
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

    query.price = { $gte: parseFloat(String(minPrice)), $lte: parseFloat(String(maxPrice)) };

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

    items = result.map((item) => ({
      ...item,
      _id: item._id.toString(),
    })) as unknown as FormData[];

    itemCount = total;
  } catch (error) {
    console.error("Error fetching marketplace items:", error);
    errorMessage = "Failed to fetch marketplace items. Please try again later.";
  }

  return (
    <div className="my-4">
      <div>
        <Filters />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {items.length === 0 && !errorMessage ? (
          <p className="text-gray-500">No listings found.</p>
        ) : (
          items.map((item) => (
            <Link href={`/marketplace/product/${item._id}`} key={item._id}>
              <div className="border hover:shadow-xl p-3 rounded-md">
                <div className="w-full h-56 relative -z-10">
                  <Image
                    className="object-cover rounded-md border"
                    fill
                    src={
                      typeof item.photos[0] === "string"
                        ? item.photos[0]
                        : URL.createObjectURL(item.photos[0])
                    }
                    alt={item.productName}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold capitalize mt-2">
                    {item.productName}
                  </h3>
                  <p className="text-green-400 font-bold mt-1">
                    {item.price} $
                  </p>
                  <p className="text-gray-500 text-sm">{item.location}</p>
                  <p>{timeAgeCalculator(item?.listed || "")}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <PaginationControls totalPages={itemCount} />
    </div>
  );
}
