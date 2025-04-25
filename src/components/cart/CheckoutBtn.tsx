import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
type CartItem = {
  name: string;
  price: number;
  quantity: number;
};
export default function CheckoutBtn({ data }: { data: CartItem[] }) {
  console.log(data);

  const total = data.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-xl">Subtotal </h3>
        <span className="text-2xl flex items-center">
          {total.toFixed(2)} <FaBangladeshiTakaSign />
        </span>
      </div>
      <div className="text-center mt-2">
        <button className="px-15 py-4 text-white rounded-full cursor-pointer bg-[#0D542B]">
          Checkout
        </button>
      </div>
    </div>
  );
}
