"use client";

import Link from "next/link";
import { AlertCircle, RefreshCw, Home, HelpCircle } from "lucide-react";

export default function PaymentFailPage() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 bg-gradient-to-br from-red-50/50 via-white to-orange-50/50 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 text-center relative overflow-hidden">
        {/* Decorative Red Flare */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-500/10 rounded-full blur-3xl -z-10" />

        {/* Animated Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full scale-150 animate-ping opacity-25" />
            <div className="relative bg-red-500 text-white p-4 rounded-full shadow-[0_8px_30px_rgb(239,68,68,0.3)]">
              <AlertCircle className="w-12 h-12 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Something went wrong while processing your payment transaction. Please check your details and try again.
        </p>

        {/* Support Box */}
        <div className="bg-gray-50/80 rounded-2xl p-5 mb-8 border border-gray-100 text-left space-y-3">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-gray-700">Need help?</h4>
              <p className="text-xs text-gray-400">
                If your money was deducted, it will be refunded automatically by your bank within 3-5 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/cart"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-red-650 hover:bg-red-700 text-white font-semibold rounded-2xl bg-red-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-red-200"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Try Payment Again
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
