// app/layout.jsx
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-200 p-5">
            <div className="pb-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Dashboard abc</h2>
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
                    href="/dashboard/users"
                    className="block py-2 px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
                  >
                    Users
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

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Navbar */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h1 className="text-lg font-medium text-gray-800">Welcome</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">User Name</span>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors">
                  Logout
                </button>
              </div>
            </header>

            {/* Page Content */}
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
