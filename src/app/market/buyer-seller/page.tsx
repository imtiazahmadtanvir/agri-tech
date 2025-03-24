"use client";
import { useState, useEffect } from "react";
import { MarketplaceItemForBuy } from "@/types/type";
import MarketplaceList from "@/components/market/MarketplaceList";
import Filters from "@/components/market/Filters";

const SeedEquipmentMarketplace = () => {
  const [items, setItems] = useState<MarketplaceItemForBuy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortByValue, setSortByValue] = useState<string>("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        if (category) url.searchParams.append("category", category);
        if (sortBy) {
          url.searchParams.append("sortBy", sortBy);
          url.searchParams.append("sortOrder", sortOrder);
        }

        console.log("Fetching URL:", url.toString());

        const response = await fetch(url.toString(), {
          credentials: "include",
        });
        const result = await response.json();

        if (result.success) {
          const mappedItems = result.data.map((item: any) => ({
            id: item._id || item.id,
            productName: item.productName,
            productPhoto: item.productPhoto,
            description: item.description,
            price: item.price,
            unit: item.unit,
            quantity: item.quantity,
            category: item.category,
            isOrganic: item.isOrganic,
            location: item.location,
            contactNumber: item.contactNumber,
            availabilityDate: item.availabilityDate,
          }));
          setItems(mappedItems);
          console.log("Fetched items:", mappedItems); // Debug items
        } else {
          setError("Failed to load items.");
        }
      } catch (err) {
        setError("Failed to load items. Please try again later.");
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [category, sortBy, sortOrder]);

  const handleCategoryChange = (newCategory: string) => {
    console.log("New category selected:", newCategory); // Debug state change
    setCategory(newCategory);
  };

  const handleSortChange = (
    newSortBy: string,
    newSortOrder: "asc" | "desc"
  ) => {
    console.log("New sort selected:", newSortBy, newSortOrder); // Debug state change
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    // Map to UI-compatible sortByValue
    if (newSortBy === "price" && newSortOrder === "asc") {
      setSortByValue("price-low");
    } else if (newSortBy === "price" && newSortOrder === "desc") {
      setSortByValue("price-high");
    } else if (newSortBy === "listed" && newSortOrder === "desc") {
      setSortByValue("date");
    } else {
      setSortByValue("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-[#0D401C]">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-[#0D401C]">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#0D401C] mb-6 text-center">
          Buy and Sell Marketplace 🛒
        </h1>
        <Filters
          useCase="buyer-seller"
          category={category}
          sortBy={sortByValue}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
        />
        <MarketplaceList items={items} />
      </div>
    </div>
  );
};

export default SeedEquipmentMarketplace;
