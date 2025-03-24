import ProductCard from "./ProductCard";
import { MarketplaceItem } from "@/types/type";

interface MarketplaceListProps {
  items: MarketplaceItem[];
}

const MarketplaceForEq = ({ items }: MarketplaceListProps) => {
  console.log("Items in MarketplaceList:", items);

  return (
    <>
      {items.length === 0 ? (
        <p className="text-[#0D401C] text-center">No items available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default MarketplaceForEq;
