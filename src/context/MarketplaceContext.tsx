"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
interface MarketplaceContextType {
  minPrice: number;
  maxPrice: number;
  selectedCategories: string;
  activeSection: string;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
  setSelectedCategories: (categories: string) => void;
  setActiveSection: (section: string) => void;
}
const MarketplaceContext = createContext<MarketplaceContextType | undefined>(
  undefined
);
export default function MarketplaceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string>("products");

  return (
    <MarketplaceContext.Provider
      value={{
        minPrice,
        maxPrice,
        selectedCategories,
        activeSection,
        setMaxPrice,
        setMinPrice,
        setActiveSection,
        setSelectedCategories,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}
export function useMarketPlace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
}
