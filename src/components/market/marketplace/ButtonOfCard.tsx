"use client";
import { useCart } from "@/Hook/useCart";
import axios from "axios";
import toast from "react-hot-toast";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

export default function ButtonOfCard({ id }: { id: string }) {
  const { refetch } = useCart();
  const handleAddToCart = async () => {
    try {
      await axios.post("/api/cart", {
        productId: id,
        quantity: 1,
      });
      toast.success("Added to cart!");
      refetch();
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error("failed to added cart");
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
      {/* <button className="size-8 flex justify-center cursor-pointer rounded-full border items-center text-[#3D9958] hover:text-white hover:bg-[#3D9958] transition-all duration-300 ease-in-out">
        <FaHeart />
      </button> */}
    </div>
  );
}
