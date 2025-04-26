"use client";
import { usePathname } from "next/navigation";
import React, { createContext, ReactNode, useContext, useState } from "react";
interface MarketplaceContextType {
  minPrice: number | string;
  maxPrice: number | string;
  pathname: string;
  category: string;
  currentPage: number;
  setMinPrice: (value: number | string) => void;
  setMaxPrice: (value: number | string) => void;
  setCategory: (categories: string) => void;
  setCurrentPage: (value: number) => void;
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
  const [category, setCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <MarketplaceContext.Provider
      value={{
        minPrice,
        maxPrice,
        category,
        pathname,
        setMaxPrice,
        setMinPrice,
        setCategory,
        currentPage,
        setCurrentPage,
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
