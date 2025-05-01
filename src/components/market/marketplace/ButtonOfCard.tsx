"use client";
import { useCart } from "@/Hook/useCart";
import { Product } from "@/types/type";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

export default function ButtonOfCard({ item }: { item: Product }) {
  console.log(item);
  const { data: session } = useSession();
  const { refetch } = useCart();
  const { push } = useRouter();
  console.log(item);
  const handleAddToCart = async () => {
    if (!session) {
      return push("/login");
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
