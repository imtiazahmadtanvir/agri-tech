"use client";
import { usePathname } from "next/navigation";
import React, { createContext, ReactNode, useContext, useState } from "react";
interface MarketplaceContextType {
  minPrice: number | string;
  maxPrice: number | string;
  pathname: string;
  location: string;
  selectedCategories: string;
  setMinPrice: (value: number | string) => void;
  setMaxPrice: (value: number | string) => void;
  setSelectedCategories: (categories: string) => void;
  setLocation: (Location: string) => void;
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

  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [selectedCategories, setSelectedCategories] = useState<string>("");
  const [location, setLocation] = useState("all location");

  return (
    <MarketplaceContext.Provider
      value={{
        minPrice,
        location,
        setLocation,
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
