import ProductCard from "./ProductCard";
import Filters from "./Filters";
import { MarketplaceItemForBuy } from "@/types/type";

interface MarketplaceListProps {
  items: MarketplaceItemForBuy[];
  onToggleForm: () => void;
}

const MarketplaceList = ({ items, onToggleForm }: MarketplaceListProps) => {
  return (
    <>
      <p className="text-[#0D401C] text-center mb-8">
        Browse seeds and equipment from trusted sellers.
      </p>
      <div className="flex justify-center mb-6">
        <button
          onClick={onToggleForm}
          className="bg-[#0D401C] text-white px-4 py-2 rounded-md hover:bg-[#F8C32C] hover:text-[#0D401C] transition-colors duration-300"
        >
          Post an Ad
        </button>
      </div>
      <Filters useCase="seed-equipment" />
      {items.length === 0 ? (
        <p className="text-[#0D401C] text-center">No items available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default MarketplaceList;
