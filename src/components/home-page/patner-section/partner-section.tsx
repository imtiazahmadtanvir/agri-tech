/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

// Define screen size state type
interface ScreenSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
}

// Define logo type
interface Logo {
  name: string;
  src: string;
  alt: string;
}

// Debounce function to limit resize event firing
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  } as T;
}

export default function PatnerSection() {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Optimized screen size detection with debounce
  const updateScreenSize = useCallback(
    debounce(() => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024 && width < 1536,
        isLargeDesktop: width >= 1536,
      });
    }, 250),
    []
  );

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
      clearTimeout(timer);
    };
  }, [updateScreenSize]);

  const logos: Logo[] = [
    { name: "Wide Open Agriculture", src: "/PartnerLogo/client1.webp", alt: "Wide Open Agriculture logo" },
    { name: "Sollio Agriculture", src: "/PartnerLogo/client2.webp", alt: "Sollio Agriculture logo" },
    { name: "Syngenta", src: "/PartnerLogo/client3.webp", alt: "Syngenta logo" },
    { name: "Strachan Valley Farm", src: "/PartnerLogo/client4.webp", alt: "Strachan Valley Farm logo" },
    { name: "New Holland Agriculture", src: "/PartnerLogo/client5.webp", alt: "New Holland Agriculture logo" },
    { name: "Stonyfield Organic", src: "/PartnerLogo/client6.webp", alt: "Stonyfield Organic logo" },
  ];

  // Determine appropriate sizes attribute based on screen size
  const getSizes = useCallback((): string => {
    if (screenSize.isMobile) return "45vw";
    if (screenSize.isTablet) return "30vw";
    if (screenSize.isDesktop) return "25vw";
    return "20vw";
  }, [screenSize]);

  return (
    <section className=" py-8 px-3 sm:py-12 sm:px-4 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <h2 className="text-center mb-6 text-3xl md:text-4xl font-bold  text-gray-600">
          Agriculture Partners
        </h2>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 lg:gap-10" role="list" aria-label="Agriculture partner logos">
          {logos.map((logo, index) => (
            <div key={logo.name} className="flex items-center justify-center p-2 sm:p-3 md:p-4 transition-all duration-300 hover:opacity-80 focus-within:ring-2 focus-within:ring-green-600 rounded-md" role="listitem">
              <div className="relative w-full h-12 xs:h-14 sm:h-16 md:h-18 lg:h-20 xl:h-24">
                {isLoading ? (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
                ) : (
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    fill
                    priority={index < 3}
                    style={{ objectFit: "contain" }}
                    sizes={getSizes()}
                    className="transition-opacity duration-300 opacity-0"
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).classList.remove("opacity-0");
                      (e.target as HTMLImageElement).classList.add("opacity-100");
                    }}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
