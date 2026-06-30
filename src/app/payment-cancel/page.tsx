import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-yellow-600 mb-4">
        Payment Cancelled!
      </h1>
      <p className="text-gray-600 mb-6">
        You have cancelled the payment. If it was a mistake, try again.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}
