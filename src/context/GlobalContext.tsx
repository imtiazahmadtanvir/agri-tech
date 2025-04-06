"use client";

import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({});
export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [registerData, setRegisterData] = useState({});
  const value = { registerData, setRegisterData };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}
