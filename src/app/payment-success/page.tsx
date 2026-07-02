"use client";

import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight, Home } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [transactionId, setTransactionId] = useState("");
  const amount = searchParams.get("amount");

  useEffect(() => {
    // Generate a random transaction ID for display if not returned by URL
    const randId = "TXN-" + Math.random().toString(36).substring(3, 11).toUpperCase();
    setTransactionId(randId);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 bg-gradient-to-br from-green-50/50 via-white to-emerald-50/50 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 text-center relative overflow-hidden">
        {/* Decorative Green Light Flare */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

        {/* Animated Check Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-100 rounded-full scale-150 animate-ping opacity-25" />
            <div className="relative bg-emerald-500 text-white p-4 rounded-full shadow-[0_8px_30px_rgb(16,185,129,0.3)]">
              <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Thank you for supporting sustainable farming! Your transaction was completed successfully.
        </p>

        {/* Receipt Container */}
        <div className="bg-gray-50/80 rounded-2xl p-5 mb-8 border border-gray-100 text-left space-y-3">
          <div className="flex justify-between text-xs text-gray-400 font-medium">
            <span>TRANSACTION ID</span>
            <span className="font-mono text-gray-700">{transactionId}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400 font-medium border-t border-gray-200/60 pt-3">
            <span>PAYMENT METHOD</span>
            <span className="text-gray-700 font-semibold">SSLCommerz Sandbox</span>
          </div>
          {amount && (
            <div className="flex justify-between text-xs text-gray-400 font-medium border-t border-gray-200/60 pt-3">
              <span>AMOUNT PAID</span>
              <span className="text-emerald-700 font-extrabold text-base">
                ৳{parseFloat(amount).toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* Navigation Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/marketplace"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-2xl shadow-[0_10px_20px_rgba(4,120,87,0.15)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold rounded-2xl transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-emerald-700 border-t-transparent" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
