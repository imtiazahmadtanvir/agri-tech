"use client";
import { useState, useEffect } from "react";
import { MarketplaceItemForBuy } from "@/types/type";
import MarketplaceList from "@/components/market/MarketplaceList";
import FormForBuySell from "@/components/market/FormForBuySell";

const SeedEquipmentMarketplace = () => {
  const [items, setItems] = useState<MarketplaceItemForBuy[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        const result = await response.json();

        if (result.success) {
          setItems(result.data); // Correctly access the 'data' array
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
  }, []);

  const handleAddItem = (newItem: MarketplaceItemForBuy) => {
    setItems((prevItems) => [...prevItems, newItem]);
    setShowPostForm(false);
  };

  const toggleForm = () => setShowPostForm((prev) => !prev);

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
          Buy and Seller Marketplace 🛒
        </h1>
        {showPostForm ? (
          <FormForBuySell onAddItem={handleAddItem} onCancel={toggleForm} />
        ) : (
          <MarketplaceList items={items} onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default SeedEquipmentMarketplace;
