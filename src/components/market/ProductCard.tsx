"use client";
import { MarketplaceItemForBuy } from "@/types/type";
import Image from "next/image";
import toast from "react-hot-toast";

const ProductCard = ({ item }: { item: MarketplaceItemForBuy }) => {
  if (!item) {
    return <div>Product data is missing</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
      {item.productPhoto && (
        <Image
          src={item.productPhoto}
          alt={item.productName}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-xl font-semibold text-[#0D401C]">
        {item.productName}
      </h2>
      <p className="text-gray-600 mt-1 truncate">{item.description}</p>
      <p className="text-[#F8C32C] font-bold mt-2">${item.price}</p>
      <p className="text-gray-500 mt-1">
        Stock: {item.quantity} {item.unit}
      </p>
      <p className="text-gray-500 mt-1">Category: {item.category}</p>
      {item.isOrganic && <p className="text-gray-500 mt-1">Organic: Yes</p>}
      <div className="mt-2">
        <p className="text-gray-500">
          Seller: {item.username} ({item.location})
        </p>
        <p className="text-gray-500">Contact: {item.email}</p>
      </div>
      <p className="text-gray-400 text-sm mt-1">
        Listed: {new Date(item.availabilityDate).toLocaleDateString()}
      </p>
      <button
        onClick={() =>
          toast.success(`Contact ${item.username} at ${item.email}`)
        }
        className="mt-4 w-full bg-[#0D401C] text-white py-2 rounded-md hover:bg-[#F8C32C] hover:text-[#0D401C] transition-colors duration-300"
      >
        Contact Seller
      </button>
    </div>
  );
};

export default ProductCard;
