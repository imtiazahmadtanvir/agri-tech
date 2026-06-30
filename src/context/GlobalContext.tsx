"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the type of the context value
type GlobalContextType = {
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};

// 2. Pass that type into createContext
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// 3. Define the provider
export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [total, setTotal] = useState<number>(0);

  const value: GlobalContextType = {
    total,
    setTotal,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

// 4. Export custom hook with error handling
export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
}
