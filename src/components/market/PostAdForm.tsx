"use client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { imageUpload } from "@/utils/imageUrl";
import { MarketplaceItem } from "@/types/type";

interface PostAdFormProps {
  onAddItem: (item: MarketplaceItem) => void;
  onCancel: () => void;
}

const PostAdForm = ({ onAddItem, onCancel }: PostAdFormProps) => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<"seeds" | "equipment">("seeds");
  const [condition, setCondition] = useState<"new" | "used" | "">("");
  const [stock, setStock] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = "/images/placeholder.jpg";
      if (imageFile) {
        imageUrl = await imageUpload(imageFile);
      }

      const newItem: MarketplaceItem = {
        id: Date.now().toString(),
        name,
        image: imageUrl,
        description,
        price,
        category,
        ...(category === "equipment" && condition && { condition }),
        seller: { name: sellerName, contact, location },
        stock: parseInt(stock),
      };

      const response = await axios.post("/api/marketplace-items", newItem);
      onAddItem(response.data);
      toast.success("Ad posted successfully!");
      resetForm();
    } catch (error) {
      toast.error("Failed to post ad. Please try again.");
      console.error("Error posting ad:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setImageFile(null);
    setImagePreview(null);
    setDescription("");
    setPrice("");
    setCategory("seeds");
    setCondition("");
    setStock("");
    setSellerName("");
    setContact("");
    setLocation("");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-[#0D401C] mb-6 text-center">
        Post Your Ad
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[#0D401C]">Item Name</label>
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
            <label className="block text-[#0D401C]">Category</label>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as "seeds" | "equipment")
              }
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="seeds">Seeds</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>
        </div>
        {category === "equipment" && (
          <div>
            <label className="block text-[#0D401C]">Condition</label>
            <select
              value={condition}
              onChange={(e) =>
                setCondition(e.target.value as "new" | "used" | "")
              }
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
        )}
        <div>
          <label className="block text-[#0D401C]">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
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
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md text-white transition-colors duration-300 ${
              isSubmitting
                ? "bg-[#0D401C] opacity-50 cursor-not-allowed"
                : "bg-[#0D401C] hover:bg-[#F8C32C] hover:text-[#0D401C]"
            }`}
          >
            {isSubmitting ? "Posting..." : "Post Ad"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-gray-300 text-[#0D401C] py-2 rounded-md hover:bg-gray-400 transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostAdForm;
