import Image from "next/image";
import Container from "./max-w-container/Container";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

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

  return (
    <nav className="z-50 relative bg-white shadow-md">
      <Container className="px-5 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Image src="/logo.png" alt="Logo" width={150} height={50} />
          </div>
          {/* Nav links */}
          <ul className="md:flex hidden gap-6">{links}</ul>
          <MobileNav links={links} />
          {/* Auth Button */}
          <div>
            {session ? (
              <form action="/api/logout" method="POST">
                <button
                  type="submit"
                  className="bg-[#0D401C] text-white px-4 py-2 rounded-md hover:bg-[#F8C32C] hover:text-[#0D401C] transition-all duration-300 font-semibold"
                >
                  Logout
                </button>
              </form>
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
