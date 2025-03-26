"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Container from "./max-w-container/Container";
import MobileNav from "@/components/shared/MobileNav";

// Types for navigation items
interface NavItem {
  label: string;
  href?: string;
  icon: string;
  subItems?: SubItem[];
}

interface SubItem {
  label: string;
  href: string;
  icon: string;
}

// Navigation data
const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: "🏡" },
  {
    label: "Resources",
    icon: "▼",
    subItems: [
      { label: "Guides & Tutorials", href: "/resources/guides", icon: "📚" },
      { label: "Government Schemes", href: "/resources/schemes", icon: "🏛️" },
    ],
  },
  {
    label: "Market",
    icon: "▼",
    subItems: [
      { label: "Price Tracking", href: "/market/prices", icon: "💰" },
      {
        label: "Marketplace",
        href: "/market/marketplace",
        icon: "🛒",
      },
      { label: "Demand Forecasting", href: "/market/forecasting", icon: "📈" },
    ],
  },
  {
    label: "Expert Help",
    icon: "▼",
    subItems: [
      {
        label: "Chat/Video Consultation",
        href: "/expert-help/chat",
        icon: "💬",
      },
      { label: "AI Chatbot", href: "/expert-help/ai", icon: "🤖" },
      { label: "Q&A Forum", href: "/expert-help/qa", icon: "❓" },
    ],
  },
  {
    label: "Tools",
    icon: "▼",
    subItems: [
      { label: "Crop Planner", href: "/tools/crop-planner", icon: "🌾" },
      {
        label: "Pest/Disease Detector",
        href: "/tools/pest-detector",
        icon: "🐞",
      },
      {
        label: "Yield Calculator",
        href: "/tools/yield-calculator",
        icon: "➗",
      },
    ],
  },
  {
    label: "Community",
    icon: "▼",
    subItems: [
      { label: "Farmer Forum", href: "/community/forum", icon: "🗣️" },
      { label: "Local Events", href: "/community/events", icon: "📅" },
      { label: "Cooperative Groups", href: "/community/groups", icon: "👥" },
    ],
  },
];

const DropdownMenu = ({ item }: { item: NavItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="text-[#0D401C] hover:text-[#F8C32C] transition-colors flex items-center gap-1">
        {item.label} <span>{item.icon}</span>
      </button>
      {isOpen && item.subItems && (
        <ul className="absolute left-0 top-full mt-0 w-56 bg-white shadow-lg rounded-md py-2 z-10 border-t border-gray-200">
          {item.subItems.map((subItem) => (
            <li key={subItem.href}>
              <Link
                href={subItem.href}
                className="px-4 py-2 text-[#0D401C] hover:bg-[#F8C32C] hover:text-white transition-colors flex items-center gap-2"
              >
                <span>{subItem.icon}</span> {subItem.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// NavItems component
const NavItems = ({ isMobile = false }: { isMobile?: boolean }) => (
  <ul className={isMobile ? "space-y-4" : "md:flex hidden gap-6 items-center"}>
    {navItems.map((item) =>
      item.subItems ? (
        <li key={item.label}>
          <DropdownMenu item={item} />
        </li>
      ) : (
        <li key={item.href}>
          <Link
            href={item.href!}
            className="text-[#0D401C] hover:text-[#F8C32C] transition-colors flex items-center gap-1"
          >
            {item.icon} {item.label}
          </Link>
        </li>
      )
    )}
  </ul>
);

const AuthSection = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const displayName =
    session?.user?.firstName && session?.user?.lastName
      ? `${session.user.firstName} ${session.user.lastName}`
      : session?.user?.name || "User";

  if (status === "loading") {
    return <span className="text-[#0D401C]">Loading...</span>;
  }

  if (session) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-[#0D401C]">
              {displayName[0]} {/* Initial if no image */}
            </div>
          )}
        </button>

        {/* Dropdown with Dashboard and Logout */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10 border border-gray-200">
            <div className="px-4 py-2 text-[#0D401C] flex items-center gap-2 border-b border-gray-200">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span>
                {displayName} ({session.user?.role})
              </span>
            </div>
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-[#0D401C] hover:bg-[#F8C32C] hover:text-white transition-all duration-300 font-semibold"
              onClick={() => setIsOpen(false)} // Close dropdown on click
            >
              Dashboard 📊
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-[#0D401C] hover:bg-[#F8C32C] hover:text-white transition-all duration-300 font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  // Unauthenticated state
  return (
    <Link
      href="/login"
      className="bg-[#0D401C] text-white px-4 py-2 rounded-md hover:bg-[#F8C32C] hover:text-[#0D401C] transition-all duration-300 font-semibold"
    >
      Login
    </Link>
  );
};

const Navbar = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <nav className="z-50 relative bg-white shadow-md">
      <Container className="px-5 py-4">
        <div className="flex justify-between items-center">
          <div>
            <Image src="/logo.png" alt="Logo" width={150} height={50} />
          </div>
          <NavItems />
          <MobileNav links={<NavItems isMobile />} />
          <AuthSection />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
