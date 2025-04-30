import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="h-[calc(100vh-980px)] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="text-gray-700 mb-6">
        Thank you for your purchase. Your payment has been successfully
        processed.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
