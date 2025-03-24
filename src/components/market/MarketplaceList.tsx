import ProductCard from "./ProductCard";
import Filters from "./Filters";
import { MarketplaceItemForBuy } from "@/types/type";

interface MarketplaceListProps {
  items: MarketplaceItemForBuy[];
}

const MarketplaceList = ({ items }: MarketplaceListProps) => {
  console.log(items);
  return (
    <>
      <p className="text-[#0D401C] text-center mb-8">
        Browse seeds and equipment from trusted sellers.
      </p>

      <Filters useCase="buyer-seller" />
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

export default MarketplaceList;
