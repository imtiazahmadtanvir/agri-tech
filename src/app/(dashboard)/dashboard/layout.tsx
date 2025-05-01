"use client";
import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiShoppingBag,
  FiCloud,
} from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: <FiHome size={20} />, label: "Home" },

    {
      href: "/dashboard/products",
      icon: <FiShoppingBag size={20} />,
      label: "Products",
    },
    {
      href: "/dashboard/weather",
      icon: <FiCloud size={20} />,
      label: "Weather",
    },
  ];

  useEffect(() => {
    const savedState =
      typeof window !== "undefined"
        ? localStorage.getItem("sidebarCollapsed")
        : null;
    setCollapsed(savedState === "true");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarCollapsed", collapsed.toString());
    }
  }, [collapsed]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/5 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-30 ${
          collapsed ? "w-20" : "w-64"
        } bg-white border-r border-gray-200 h-screen transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div
            className={`flex ${
              collapsed ? "justify-center" : "justify-between"
            } items-center p-4 border-b border-gray-200`}
          >
            {!collapsed && (
              <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            )}
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1 p-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-md transition-colors ${
                      pathname === item.href
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!collapsed && <span className="ml-3">{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Collapse button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center w-full p-2 rounded-md hover:bg-gray-200 text-gray-600"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <FiChevronRight size={20} />
              ) : (
                <FiChevronLeft size={20} />
              )}
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center p-4 bg-white border-b border-gray-200">
          <button
            className="text-gray-500 hover:text-gray-700 mr-4"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-lg font-medium text-gray-800">
            {navItems.find((item) => item.href === pathname)?.label ||
              "Dashboard"}
          </h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F5F6F7]">
          {children}
        </main>
      </div>
    </div>
  );
}
