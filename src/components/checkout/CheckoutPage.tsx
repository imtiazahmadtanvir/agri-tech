"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { convertTakaToPaisa } from "@/utils/currency";
import { useSession } from "next-auth/react";
import { useCart } from "@/Hook/useCart";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const { data: cartData } = useCart();
  console.log(cartData);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertTakaToPaisa(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !session || !session.user?.email) return;

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?amount=${amount}`,
      },
      redirect: "if_required",
    });

    // If payment fails, show the error message
    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      console.error("Payment confirmation failed:", error);
      return;
    }
    if (paymentIntent?.status === "succeeded") {
      try {
        const response = await fetch("/api/clear-cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartData.cart),
        });

        if (!response.ok) {
          throw new Error("Failed to clear the cart");
        }

        console.log("Cart cleared successfully");
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?amount=${amount}`;
      } catch (err) {
        console.error("Error clearing cart:", err);
        setErrorMessage("An error occurred while clearing the cart.");
      } finally {
        setLoading(false);
      }
    }
  };

  // If clientSecret, stripe, or elements are not yet ready, show a loading spinner
  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-black border-t-transparent" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md">
      <PaymentElement />
      {errorMessage && (
        <div className="text-red-600 mt-2 text-sm font-medium">
          {errorMessage}
        </div>
      )}
      <button
        disabled={!stripe || loading}
        className="text-white w-full p-4 bg-black mt-4 rounded-md font-bold disabled:opacity-50"
      >
        {!loading ? `Pay ৳${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
