"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

interface MobileNavProps {
  links: React.ReactNode;
}

export default function MobileNav({ links }: MobileNavProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      console.log("Menu is now:", !prev);
      return !prev;
    });
  };

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [isMenuOpen]);

  return (
    <>
      <button
        onClick={toggleMenu}
        aria-label="Toggle mobile menu"
        className="lg:hidden"
      >
        <Image height={45} width={45} alt="Menu icon" src="/icons/menu.svg" />
      </button>
      <div
        ref={menuRef}
        tabIndex={-1}
        className={`lg:hidden gap-6 py-20 md:w-80 w-60 px-10 fixed inset-y-0 left-0 z-50 text-white bg-[#0D401C] transition-transform duration-500 ${
          isMenuOpen ? "-translate-x-5" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          aria-label="Close mobile menu"
          className="absolute right-5 top-4"
        >
          <IoMdClose className="text-[#F8C32C]" size={24} />
        </button>
        <ul className="flex flex-col">
          <div className="mb-6">
            <Image src="/logo.png" alt="Logo" width={150} height={50} />
          </div>
          {links}
        </ul>
      </div>
    </>
  );
}
