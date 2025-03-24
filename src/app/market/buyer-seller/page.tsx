"use client";
import { useState, useEffect } from "react";
import { MarketplaceItemForBuy } from "@/types/type";
import MarketplaceList from "@/components/market/MarketplaceList";
import Filters from "@/components/market/Filters"; // Adjust path

const SeedEquipmentMarketplace = () => {
  const [items, setItems] = useState<MarketplaceItemForBuy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        if (category) url.searchParams.append("category", category);
        if (sortBy) {
          url.searchParams.append("sortBy", sortBy);
          url.searchParams.append("sortOrder", sortOrder);
        }

        const response = await fetch(url.toString(), {
          credentials: "include",
        });
        const result = await response.json();

        if (result.success) {
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
    setCategory(newCategory);
  };

  const handleSortChange = (
    newSortBy: string,
    newSortOrder: "asc" | "desc"
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
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
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
        />
        <MarketplaceList items={items} />
      </div>
    </div>
  );
};

export default SeedEquipmentMarketplace;
