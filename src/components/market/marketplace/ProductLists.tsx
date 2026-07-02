import NoResults from "@/components/NoResults";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MapPin, Calendar, CheckCircle2, Tag } from "lucide-react";
import ButtonOfCard from "./ButtonOfCard";
import { Product } from "@/types/type";
import { timeAgeCalculator } from "@/utils/timeCalculate";

interface ParamsProps {
  view?: string | undefined;
}

export default async function ProductLists({
  items,
  searchParams,
}: {
  items: Product[];
  searchParams: Promise<ParamsProps>;
}) {
  const { view } = await searchParams;

  if (!items || items.length === 0) {
    return <NoResults />;
  }

  return (
    <div
      className={`${
        view
          ? "space-y-6"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      }`}
    >
      {items.map((item) => (
        <div
          className={`group bg-white border border-gray-100 overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 ${
            view ? "flex gap-6 p-4" : "flex flex-col"
          }`}
          key={item._id}
        >
          {/* Product Image Wrapper */}
          {item.photoUrls?.[0] && (
            <Link
              href={`/marketplace/product/${item._id}`}
              className={`block overflow-hidden relative ${
                view ? "w-1/3 h-48 rounded-xl shrink-0" : "w-full h-64"
              }`}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  fill
                  sizes={view ? "33vw" : "(max-width: 768px) 100vw, 33vw"}
                  src={item.photoUrls[0]}
                  alt={item.productName}
                  priority={true}
                />
              </div>

              {/* Tag / Category Badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-800 text-xs font-semibold py-1 px-2.5 rounded-full flex items-center gap-1 shadow-sm border border-emerald-100">
                <Tag className="w-3 h-3" />
                {item.category}
              </div>

              {/* Verification Status Badge */}
              {item.verifyStatus && (
                <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1 rounded-full shadow-md" title="Verified Producer">
                  <CheckCircle2 className="w-4 h-4 fill-emerald-500 stroke-white" />
                </div>
              )}
            </Link>
          )}

          {/* Details Content Wrapper */}
          <div className="p-5 flex flex-col justify-between flex-1">
            <div>
              <Link href={`/marketplace/product/${item._id}`}>
                <h3 className="font-semibold text-lg text-gray-800 hover:text-emerald-700 transition-colors line-clamp-1 leading-snug">
                  {item.productName}
                </h3>
              </Link>

              {/* Price & Unit */}
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-xl font-bold text-emerald-700 flex items-center">
                  {item.price}
                  <FaBangladeshiTakaSign className="w-4 h-4 ml-0.5 mt-0.5" />
                </span>
                {item.unit && (
                  <span className="text-xs text-gray-400 font-medium">/ {item.unit}</span>
                )}
              </div>

              {/* Grid Metadata: Location & Date */}
              {!view && (
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 gap-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-300" />
                    <span className="truncate max-w-[120px]">Dhaka Division</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-300" />
                    <span>{timeAgeCalculator(item.listed || new Date().toISOString())}</span>
                  </div>
                </div>
              )}

              {/* List View Details description */}
              {view && (
                <div className="mt-3 text-sm text-gray-500 font-nunito border-t border-gray-50 pt-3">
                  <p className="line-clamp-2 leading-relaxed">{item.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-300" />
                      <span>Dhaka Division</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-300" />
                      <span>{timeAgeCalculator(item.listed || new Date().toISOString())}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Call To Actions */}
            <div className="mt-5 pt-3 border-t border-gray-50/50">
              <ButtonOfCard item={item} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
