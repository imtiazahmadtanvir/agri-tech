import Link from "next/link";

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-5">
        <div className="pb-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
        </div>
        <nav className="mt-5">
          <ul className="space-y-2">
            <li>
              <Link
                href="/adminDashboard"
                className="block py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                href="/adminDashboard/users"
                className="block py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/adminDashboard/marketplace"
                className="block py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
              >
                Marketplace
              </Link>
            </li>

            <li>
              <Link
                href="/adminDashboard/content"
                className="block py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
              >
                Content Management
              </Link>
            </li>
            <li>
              <Link
                href="/adminDashboard/expert"
                className="block py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
              >
                Expert Management
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
                href={"/adminDashboard/community"}
              >
                Community
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
