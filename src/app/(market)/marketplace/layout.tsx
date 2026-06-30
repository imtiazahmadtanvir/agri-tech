"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/market/marketplace/Sidebar";
import ContainerSmall from "@/components/shared/max-w-container/ContainerSmall";
import MarketplaceProvider from "@/context/MarketplaceContext";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const activePath = pathname.startsWith("/marketplace/product");

  return (
    <MarketplaceProvider>
      <ContainerSmall className="flex gap-4 flex-col lg:flex-row">
        <div className={`${activePath ? "hidden" : ""} lg:w-1/4`}>
          <Sidebar />
        </div>
        <div className={`${activePath ? "w-full mx-4" : "lg:w-3/4"}`}>
          {children}
        </div>
      </ContainerSmall>
    </MarketplaceProvider>
  );
}

export default Layout;
