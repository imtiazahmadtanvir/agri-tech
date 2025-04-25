import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function QuantityBtn({ qn }: { qn: number }) {
  const [quantity, setQuantity] = useState(qn);
  return (
    <div className="flex bg-[#F3F5F3] gap-2 border hover:border-[#0D401C] px-4 rounded-full">
      <button
        className="font-semibold py-2 cursor-pointer text-xl"
        onClick={() => setQuantity((prev) => Math.max(prev - 1, 0))}
      >
        <FiMinus />
      </button>
      <input
        value={quantity}
        className="w-7 text-center  rounded [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] focus:outline-none"
        type="number"
      />
      <button
        className="font-semibold py-2 cursor-pointer text-xl"
        onClick={() => setQuantity((prev) => prev + 1)}
      >
        <FiPlus />
      </button>
    </div>
  );
}
