"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { MarketplaceItem } from "@/types/type";
import MarketplaceForEq from "@/components/market/MarketplasceForEq";

const SeedEquipmentMarketplace = () => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`/api/equipment`);
        setItems(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch {
        setError("Failed to load items. Please try again later.");
        setLoading(false);
      }
    };
    fetchItems();
  }, []);
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
        <MarketplaceForEq items={items} />
      </div>
    </div>
  );
};

export default SeedEquipmentMarketplace;
