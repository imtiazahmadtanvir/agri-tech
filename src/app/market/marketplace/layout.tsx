import Sidebar from "@/components/market/marketplace/Sidebar";
import ContainerSmall from "@/components/shared/max-w-container/ContainerSmall";
import MarketplaceProvider from "@/context/MarketplaceContext";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <MarketplaceProvider>
      <ContainerSmall className="flex">
        <Sidebar />
        <div className="w-3/4">{children}</div>
      </ContainerSmall>
    </MarketplaceProvider>
  );
}

export default layout;
