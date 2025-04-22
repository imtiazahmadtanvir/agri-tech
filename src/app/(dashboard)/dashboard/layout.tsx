import Link from "next/link";

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-5">
        <div className="pb-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        </div>
        <nav className="mt-5">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="block py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/analytics"
                className="block py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
              >
                Analytics
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/products"
                className="block py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/weather"
                className="block py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
              >
                Weather
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className="block py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        {/* Page Content */}
        <main className="p-6  bg-[#F5F6F7]">{children}</main>
      </div>
    </div>
  );
}
