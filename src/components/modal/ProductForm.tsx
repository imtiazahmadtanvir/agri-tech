import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { convertTakaToPaisa } from "@/utils/currency";
import CheckoutPage from "../checkout/CheckoutPage";
if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not define");
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
}

export default function ProductForm({
  isOpen,
  onClose,
  totalAmount,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20 z-50"
      onClick={onClose}
    >
      <div className="bg-[#F9F7F7] rounded-lg shadow-lg w-[90%] max-w-3xl relative pb-6 p-6"></div>
    </div>
  );
}
