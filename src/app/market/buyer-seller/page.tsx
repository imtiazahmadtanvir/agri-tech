"use client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

// Define product type for buyer-seller marketplace
interface MarketplaceItem {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  unit: string; // e.g., per kg, per dozen
  category: "crops" | "livestock" | "other";
  isOrganic: boolean;
  seller: {
    name: string;
    contact: string;
    location: string;
  };
  quantity: number;
  listedDate: string;
}

// Demo data
const initialDemoItems: MarketplaceItem[] = [
  {
    id: "1",
    name: "Fresh Tomatoes",
    image: "/images/tomatoes.jpg",
    description: "Organic tomatoes, ripe and ready for sale.",
    price: "2.50",
    unit: "per kg",
    category: "crops",
    isOrganic: true,
    seller: {
      name: "Alice Brown",
      contact: "+1-234-567-8901",
      location: "Georgia",
    },
    quantity: 200,
    listedDate: "2025-03-20",
  },
  {
    id: "2",
    name: "Free-Range Chickens",
    image: "/images/chickens.jpg",
    description: "Healthy free-range chickens for meat or breeding.",
    price: "15.00",
    unit: "per unit",
    category: "livestock",
    isOrganic: false,
    seller: {
      name: "Tom Wilson",
      contact: "+1-345-678-9012",
      location: "Alabama",
    },
    quantity: 50,
    listedDate: "2025-03-21",
  },
  {
    id: "3",
    name: "Wheat Grain",
    image: "/images/wheat.jpg",
    description: "High-quality wheat grain, bulk supply.",
    price: "0.80",
    unit: "per kg",
    category: "crops",
    isOrganic: false,
    seller: {
      name: "Sarah Lee",
      contact: "+1-456-789-0123",
      location: "Kansas",
    },
    quantity: 1000,
    listedDate: "2025-03-22",
  },
];

// Post Ad Form Component
const PostAd = ({
  onAddItem,
}: {
  onAddItem: (item: MarketplaceItem) => void;
}) => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState<"crops" | "livestock" | "other">(
    "crops"
  );
  const [isOrganic, setIsOrganic] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: MarketplaceItem = {
      id: Date.now().toString(), // Temporary ID
      name,
      image: imagePreview || "/images/placeholder.jpg",
      description,
      price,
      unit,
      category,
      isOrganic,
      seller: { name: sellerName, contact, location },
      quantity: parseInt(quantity),
      listedDate: new Date().toISOString().split("T")[0],
    };
    onAddItem(newItem);
    toast.success("Ad posted successfully!");
    // Reset form
    setName("");
    setImageFile(null);
    setImagePreview(null);
    setDescription("");
    setPrice("");
    setUnit("");
    setCategory("crops");
    setIsOrganic(false);
    setQuantity("");
    setSellerName("");
    setContact("");
    setLocation("");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#0D401C] mb-6 text-center">
        Post Your Product Ad
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[#0D401C]">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-[#0D401C]">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              width={200}
              height={200}
              className="mt-2 rounded-md"
            />
          )}
        </div>
        <div>
          <label className="block text-[#0D401C]">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 h-24"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#0D401C]">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              step="0.01"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-[#0D401C]">Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Unit</option>
              <option value="per kg">Per Kilogram</option>
              <option value="per lb">Per Pound</option>
              <option value="per dozen">Per Dozen</option>
              <option value="per unit">Per Unit</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-[#0D401C]">Category</label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as "crops" | "livestock" | "other")
            }
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="crops">Crops</option>
            <option value="livestock">Livestock</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isOrganic}
            onChange={(e) => setIsOrganic(e.target.checked)}
            className="h-4 w-4 text-[#0D401C] border-gray-300"
          />
          <label className="text-[#0D401C]">Organic</label>
        </div>
        <div>
          <label className="block text-[#0D401C]">Quantity Available</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block text-[#0D401C]">Seller Name</label>
          <input
            type="text"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-[#0D401C]">Contact Number</label>
          <input
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-[#0D401C]">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#0D401C] text-white py-2 rounded-md hover:bg-[#F8C32C] hover:text-[#0D401C] transition-colors duration-300"
        >
          Post Ad
        </button>
      </form>
    </div>
  );
};

// Main Marketplace Component
const BuyerSellerMarketplace = () => {
  const [items, setItems] = useState<MarketplaceItem[]>(initialDemoItems);
  const [showPostForm, setShowPostForm] = useState(false);

  const handleAddItem = (newItem: MarketplaceItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
    setShowPostForm(false); // Switch back to listing
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#0D401C] mb-6 text-center">
          Buyer-Seller Marketplace 🤝
        </h1>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="bg-[#0D401C] text-white px-4 py-2 rounded-md hover:bg-[#F8C32C] hover:text-[#0D401C] transition-colors duration-300"
          >
            {showPostForm ? "View Listings" : "Post an Ad"}
          </button>
        </div>

        {/* Toggle between form and listings */}
        {showPostForm ? (
          <PostAd onAddItem={handleAddItem} />
        ) : (
          <>
            <p className="text-[#0D401C] text-center mb-8">
              Connect with farmers to buy or sell agricultural products.
            </p>
            {/* Filters (static for demo) */}
            <div className="mb-6 flex justify-between items-center">
              <select className="border border-gray-300 rounded-md p-2 text-[#0D401C]">
                <option value="">All Categories</option>
                <option value="crops">Crops</option>
                <option value="livestock">Livestock</option>
                <option value="other">Other</option>
              </select>
              <select className="border border-gray-300 rounded-md p-2 text-[#0D401C]">
                <option value="">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="date">Newest First</option>
              </select>
            </div>

            {/* Product Grid */}
            {items.length === 0 ? (
              <p className="text-[#0D401C] text-center">
                No items available yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    )}
                    <h2 className="text-xl font-semibold text-[#0D401C]">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 mt-1 truncate">
                      {item.description}
                    </p>
                    <p className="text-[#F8C32C] font-bold mt-2">
                      ${item.price} / {item.unit}
                    </p>
                    <p className="text-gray-500 mt-1">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-gray-500 mt-1">
                      Category: {item.category}
                    </p>
                    {item.isOrganic && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
                        Organic
                      </span>
                    )}
                    <div className="mt-2">
                      <p className="text-gray-500">
                        Seller: {item.seller.name} ({item.seller.location})
                      </p>
                      <p className="text-gray-500">
                        Contact: {item.seller.contact}
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      Listed: {new Date(item.listedDate).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() =>
                        toast.success(
                          `Contact ${item.seller.name} at ${item.seller.contact}`
                        )
                      }
                      className="mt-4 w-full bg-[#0D401C] text-white py-2 rounded-md hover:bg-[#F8C32C] hover:text-[#0D401C] transition-colors duration-300"
                    >
                      Contact Seller
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BuyerSellerMarketplace;
