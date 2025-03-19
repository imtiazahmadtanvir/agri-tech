"use client";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/shared/MobileNav";
import { useSession, signOut } from "next-auth/react";
import Container from "./max-w-container/Container";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log("Navbar session (client):", session, "status:", status);

  const links = (
    <>
      <li>
        <Link
          href="/"
          className="text-[#0D401C] hover:text-[#F8C32C] transition-colors"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/services"
          className="text-[#0D401C] hover:text-[#F8C32C] transition-colors"
        >
          Services
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className="text-[#0D401C] hover:text-[#F8C32C] transition-colors"
        >
          Contact
        </Link>
      </li>
    </>
  );

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  // Determine display name based on available fields
  const displayName =
    session?.user?.firstName && session?.user?.lastName
      ? `${session.user.firstName} ${session.user.lastName}`
      : session?.user?.name || "User";

  return (
    <nav className="z-50 relative bg-white shadow-md">
      <Container className="px-5 py-4">
        <div className="flex justify-between items-center">
          <div>
            <Image src="/logo.png" alt="Logo" width={150} height={50} />
          </div>
          <ul className="md:flex hidden gap-6">{links}</ul>
          <MobileNav links={links} />
          <div className="flex items-center gap-4">
            {status === "loading" ? (
              <span>Loading...</span>
            ) : session ? (
              <>
                <div className="flex items-center gap-2">
                  {session?.user?.image && (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-[#0D401C]">
                    Welcome, {displayName} ({session?.user?.role})
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-[#0D401C] text-white px-4 py-2 rounded-md hover:bg-[#F8C32C] hover:text-[#0D401C] transition-all duration-300 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-[#0D401C] text-white px-4 py-2 rounded-md hover:bg-[#F8C32C] hover:text-[#0D401C] transition-all duration-300 font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
      <div className="w-full">
        <Image
          src="/shapes/navMask.svg"
          style={{ width: "100%" }}
          alt="Decorative navigation mask"
          width={1920}
          height={9}
        />
      </div>
    </nav>
  );
};

export default Navbar;
