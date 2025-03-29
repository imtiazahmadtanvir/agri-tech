"use client";
import { usePathname } from "next/navigation";
import React, { createContext, ReactNode, useContext, useState } from "react";
interface MarketplaceContextType {
  minPrice: number;
  maxPrice: number;
  pathname: string;
  selectedCategories: string;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
  setSelectedCategories: (categories: string) => void;
}
const MarketplaceContext = createContext<MarketplaceContextType | undefined>(
  undefined
);
export default function MarketplaceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedCategories, setSelectedCategories] = useState<string>("");

  return (
    <MarketplaceContext.Provider
      value={{
        minPrice,
        maxPrice,
        selectedCategories,
        pathname,
        setMaxPrice,
        setMinPrice,
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
