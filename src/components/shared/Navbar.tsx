"use client";
import Image from "next/image";
import Container from "./max-w-container/Container";
import Link from "next/link";
import CommonButton from "./common-button/CommonButton";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const links = (
    <>
      <li>
        <Link href={"/"}>Home</Link>
      </li>
      <li>
        <Link href={"/services"}>Services</Link>
      </li>
      <li>
        <Link href={"/contact"}>Contact</Link>
      </li>
    </>
  );
  return (
    <nav className="z-50 relative ">
      <Container className="px-5 my-5 bg-white">
        <div className="flex bg-white  justify-between items-center">
          {/* logo */}
          <div>
            <Image src="/logo.png" alt="logo" width={150} height={50} />
          </div>
          {/* nav links */}
          <ul className="md:flex hidden gap-5">{links}</ul>
          <button onClick={toggleMenu} className="md:hidden">
            <Image height={45} width={45} alt="menu" src={"/icons/menu.svg"} />
          </button>
          {/* button   */}
          <div className="hidden lg:block">
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
      <div
        className={`md:hidden  gap-6 py-20 w-56 px-10 bottom-0 top-0 fixed z-50 text-white h-screen bg-[#0D401C] transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div onClick={toggleMenu} className="absolute right-5 top-4">
          <IoMdClose className="text-[#F8C32C]" size={24} />
        </div>
        <ul className="flex flex-col"> {links}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
