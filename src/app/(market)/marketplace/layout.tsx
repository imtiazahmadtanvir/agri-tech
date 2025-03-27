import Sidebar from "@/components/market/marketplace/Sidebar";
import ContainerSmall from "@/components/shared/max-w-container/ContainerSmall";
import MarketplaceProvider from "@/context/MarketplaceContext";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <MarketplaceProvider>
      <ContainerSmall className="flex gap-4">
        <Sidebar />
        <div className="w-3/4 scrollbar-hidden h-screen overflow-y-scroll">
          {children}
        </div>
      </ContainerSmall>
    </MarketplaceProvider>
  );
}

export default layout;
