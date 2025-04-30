"use client";
import CheckoutPage from "@/components/checkout/CheckoutPage";
import { useGlobalContext } from "@/context/GlobalContext";
import { convertTakaToPaisa } from "@/utils/currency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not define");
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentPage() {
  const { total } = useGlobalContext();
  return (
    <div className="max-w-xl mx-auto min-h-[calc(100vh-400px)]">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertTakaToPaisa(total + 100),
          currency: "bdt",
        }}
      >
        <CheckoutPage amount={total + 100}></CheckoutPage>
      </Elements>
    </div>
  );
}
