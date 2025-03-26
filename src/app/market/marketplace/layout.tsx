import ContainerSmall from "@/components/shared/max-w-container/ContainerSmall";
import MarketplaceProvider from "@/context/MarketplaceContext";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <MarketplaceProvider>
      <ContainerSmall>
        <div>{children}</div>
      </ContainerSmall>
    </MarketplaceProvider>
  );
}

export default layout;
