import Link from "next/link";

export default function PaymentFailPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed!</h1>
      <p className="text-gray-600 mb-6">
        Sorry, your payment was not successful. Please try again.
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
