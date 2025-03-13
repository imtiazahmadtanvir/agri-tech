"use client";

import dynamic from "next/dynamic";

// Import MapSectionClient dynamically with SSR disabled
const MapSection = dynamic(() => import("./MapSectionClient"), { ssr: false });

export default MapSection;
