import axios from "axios";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function QuantityBtn({
  qn,
  productId,
}: {
  qn: number;
  productId: string;
}) {
  const [quantity, setQuantity] = useState(qn);
  const updataQuantity = async (quantity: number) => {
    try {
      await axios.patch("/api/cart/update", { quantity, productId });
    } catch (error) {
      console.log(error);
    }
  };
  const handelAdd = () => {
    setQuantity((prev) => {
      const newQuantity = Math.max(prev - 1, 1);
      updataQuantity(newQuantity);
      return newQuantity;
    });
  };
  const handelRemove = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      updataQuantity(newQuantity);
      return newQuantity;
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      const newQuantity = Math.max(value, 1);
      setQuantity(newQuantity);
      updataQuantity(newQuantity);
    }
  };
  return (
    <div className="flex bg-[#F3F5F3] gap-2 border hover:border-[#0D401C] px-4 rounded-full">
      <button
        disabled={quantity === 1}
        className="font-semibold py-2 cursor-pointer disabled:text-gray-500 disabled:cursor-default text-xl"
        onClick={handelAdd}
      >
        <FiMinus />
      </button>
      <input
        onChange={handleChange}
        value={quantity}
        className="w-7 text-center  rounded [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] focus:outline-none"
        type="number"
      />
      <button
        className="font-semibold py-2 cursor-pointer text-xl"
        onClick={handelRemove}
      >
        <FiPlus />
      </button>
    </div>
  );
}
