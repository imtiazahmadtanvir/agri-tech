"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { MarketplaceItem } from "@/types/type";
import MarketplaceForEq from "@/components/market/MarketplasceForEq";
import Filters from "@/components/market/Filters";

const SeedEquipmentMarketplace = () => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [category, setCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortByValue, setSortByValue] = useState<string>("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`/api/agri-supply`);

        setItems(Array.isArray(response.data.data) ? response.data.data : []);
      } catch {
        setError("Failed to load items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleSortChange = (
    newSortBy: string,
    newSortOrder: "asc" | "desc"
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);

    if (newSortBy === "price") {
      setSortByValue(newSortOrder === "asc" ? "price-low" : "price-high");
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
          Seed & Equipment Marketplace 🛒
        </h1>
        <Filters
          useCase="seed-equipment"
          category={category}
          sortBy={sortByValue}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
        />
        <MarketplaceForEq items={items} />
      </div>
    </div>
  );
};

export default SeedEquipmentMarketplace;
