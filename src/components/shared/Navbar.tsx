import Image from "next/image";
import Container from "./max-w-container/Container";
import Link from "next/link";
import CommonButton from "./common-button/CommonButton";

const Navbar = () => {
  return (
    <nav className="z-50 relative ">
      <Container className="px-5 my-5 bg-white">
        <div className="flex bg-white  justify-between items-center">
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
          <div>
            <CommonButton>Get In Touch!</CommonButton>
          </div>
        </div>
      </Container>
      <div className="w-full">
        <Image
          src={"/shapes/navMask.svg"}
          style={{ width: "100%" }}
          alt=""
          width={1920}
          height={9}
        />
      </div>
    </nav>
  );
};

export default Navbar;
