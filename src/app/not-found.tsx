import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 ">
      <div className="text-center p-6  max-w-md mx-4">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          404 - Field Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! This page is as lost as a scarecrow in a storm. Let&apos;s get
          you back to fertile ground.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
        >
          Return to Home Farm
        </Link>
      </div>
    </div>
  );
}
