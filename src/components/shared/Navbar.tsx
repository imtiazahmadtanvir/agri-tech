"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Container from "./max-w-container/Container";
import MobileNav from "@/components/shared/MobileNav";
import DropdownMenu from "../navBar/DropdownMenu";
import { TiShoppingCart } from "react-icons/ti";
import { useCart } from "@/Hook/useCart";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";

// Types
interface NavItem {
  label: string;
  href?: string;
  icon?: string;
  subItems?: SubItem[];
}
interface SubItem {
  label: string;
  href: string;
  icon?: string;
}

// Nav items
const allNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/marketplace" },
  {
    label: "Resources",
    subItems: [
      { label: "Guides & Tutorials", href: "/resources/guides" },
      { label: "Government Schemes", href: "/resources/schemes" },
    ],
  },
  {
    label: "Tools",
    subItems: [
      {
        label: "Pest/Disease Detector",
        href: "/tools/pest-detector",
      },
    ],
  },
  {
    label: "Community",
    subItems: [
      { label: "Farmer Forum", href: "/community/forum" },
      { label: "Local Events", href: "/community/events" },
      { label: "Cooperative Groups", href: "/community/groups" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

// NavItems Component
const NavItems = ({ isMobile = false }: { isMobile?: boolean }) => {
  return (
    <ul
      className={
        isMobile
          ? "space-y-4"
          : "lg:flex hidden gap-x-8 items-center font-semibold text-lg"
      }
    >
      {allNavItems.map((item) =>
        item.subItems ? (
          <li key={item.label}>
            <DropdownMenu item={item} />
          </li>
        ) : (
          <li key={item.href}>
            <Link
              href={item.href!}
              className="text-gray-800 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

// AuthSection Component
const AuthSection = () => {
  const { data: session } = useSession();
  const { data: cartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  const displayName =
    session?.user?.firstName && session?.user?.lastName
      ? `${session.user.firstName} ${session.user.lastName}`
      : session?.user?.name || "User";

  return (
    <div className="flex items-center gap-x-4">
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="relative"
      >
        {session ? (
          <button className="focus:outline-none">
            {session.user?.image ? (
              <div className="relative">
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={44}
                  height={44}
                  className="rounded-full"
                />
                <span className="absolute bottom-0 bg-green-800 text-white rounded-full right-0">
                  <IoIosArrowDown />
                </span>
              </div>
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-primary font-bold">
                {displayName[0]}
              </div>
            )}
          </button>
        ) : (
          <button>
            <div className="relative">
              <CgProfile size={40} />
              <span className="absolute bottom-0 bg-green-800 text-white rounded-full right-0">
                <IoIosArrowDown />
              </span>
            </div>
          </button>
        )}
        {isOpen && (
          <div className="absolute right-0 w-48 bg-white shadow-lg rounded-md py-2 z-10 border border-gray-200">
            {session ? (
              <>
                <Link
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
                  href="/profile"
                >
                  My Profile
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
                  href="/myOrder"
                >
                  My Orders
                </Link>
                {session.user.role === "farmer" && (
                  <Link
                    onClick={() => setIsOpen(false)}
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
                  >
                    Dashboard
                  </Link>
                )}

                {session.user.role === "admin" && (
                  <Link
                    onClick={() => setIsOpen(false)}
                    href="/adminDashboard"
                    className="block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col">
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/login"
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
                >
                  Login
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/register"
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative">
        <Link
          href={"/cart"}
          className="w-10 h-10 flex justify-center items-center border rounded-full hover:bg-primary hover:text-white transition-all duration-300"
        >
          <TiShoppingCart size={20} />
        </Link>
        <div className="absolute -top-1 -right-1 w-5 h-5 flex justify-center items-center text-sm rounded-full bg-primary text-white">
          <span>{cartItem?.totalQuantity || 0}</span>
        </div>
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <Container className="px-5 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href={"/"}>
              <Image
                src="/logo.png"
                alt="Agri-Tech Logo"
                width={120}
                height={40}
              />
            </Link>
            <div className="ml-10">
              <NavItems />
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            <AuthSection />
            <MobileNav links={<NavItems isMobile />} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
