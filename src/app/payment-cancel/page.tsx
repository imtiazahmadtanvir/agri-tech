"use client";

import Link from "next/link";
import { AlertTriangle, ShoppingCart, Home } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 bg-gradient-to-br from-amber-50/50 via-white to-yellow-50/50 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 text-center relative overflow-hidden">
        {/* Decorative Amber Flare */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -z-10" />

        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-100 rounded-full scale-150 animate-pulse opacity-40" />
            <div className="relative bg-amber-500 text-white p-4 rounded-full shadow-[0_8px_30px_rgb(245,158,11,0.3)]">
              <AlertTriangle className="w-12 h-12 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          The transaction was cancelled at the payment gateway step. Your account was not charged.
        </p>

        {/* Action Description */}
        <p className="text-xs text-gray-400 mb-8 italic">
          If you want to review your selections or modify your shipping address, you can return to your shopping cart.
        </p>

        {/* Navigation Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/cart"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-2xl shadow-lg shadow-amber-100 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <ShoppingCart className="w-5 h-5" />
            Back to Shopping Cart
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
