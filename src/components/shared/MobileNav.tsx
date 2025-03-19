"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

interface MobileNavProps {
  links: React.ReactNode;
}

export default function MobileNav({ links }: MobileNavProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Ref for focus management

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      console.log("Menu is now:", !prev); // Log new state
      return !prev;
    });
  };

  // Trap focus in menu when open
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
        className="md:hidden"
      >
        <Image height={45} width={45} alt="Menu icon" src="/icons/menu.svg" />
      </button>
      <div
        ref={menuRef}
        tabIndex={-1} // Make div focusable
        className={`md:hidden gap-6 py-20 w-56 px-10 fixed inset-y-0 left-0 z-50 text-white bg-[#0D401C] transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          aria-label="Close mobile menu"
          className="absolute right-5 top-4"
        >
          <IoMdClose className="text-[#F8C32C]" size={24} />
        </button>
        <ul className="flex flex-col">{links}</ul>
      </div>
    </>
  );
}
