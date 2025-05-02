"use client";
import { useCart } from "@/Hook/useCart";
import { Product } from "@/types/type";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

export default function ButtonOfCard({ item }: { item: Product }) {
  const { data: session } = useSession();
  const { refetch } = useCart();
  const { push } = useRouter();

  const handleAddToCart = async () => {
    // Check if user is logged in
    if (!session) {
      toast.error("Please login to add products to your cart.");
      return push("/login");
    }

    // Validation: Check required fields
    if (!item || !item._id || !item.productName || !item.price || !item.unit) {
      return toast.error("Product data is incomplete.");
    }

    try {
      await axios.post("/api/cart", {
        productName: item.productName,
        productId: item._id,
        quantity: 1,
        unit: item.unit,
        price: item.price,
        photoUrl: item.photoUrls[0],
        vendorEmail: item.userEmail,
      });

      toast.success("Added to cart!");
      refetch();
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="flex gap-3.5">
      <button
        onClick={handleAddToCart}
        className="size-8 flex justify-center cursor-pointer rounded-full border items-center text-[#3D9958] hover:text-white hover:bg-[#3D9958] transition-all duration-300 ease-in-out"
      >
        <FaShoppingCart />
      </button>
    </div>
  );
}
