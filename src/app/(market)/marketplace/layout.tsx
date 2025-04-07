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
      <ContainerSmall className="flex gap-4">
        <div className={`${activePath ? "hidden " : ""}`}>
          <Sidebar />
        </div>
        <div className={`${activePath ? "w-full mx-4" : "w-3/4"}`}>
          {children}
        </div>
      </ContainerSmall>
    </MarketplaceProvider>
  );
}

export default Layout;
