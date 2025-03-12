import Image from "next/image";
import Container from "./max-w-container/Container";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Container className="px-5">
        <div>
          {/* logo */}
          <div>
            <Image src="/logo.png" alt="logo" width={200} height={50} />
          </div>
          {/* nav links */}
          <ul className="flex gap-5">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/services"}>Services</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
          {/* button   */}
          <div></div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
