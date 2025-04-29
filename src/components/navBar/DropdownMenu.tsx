import Link from "next/link";
import React, { useState } from "react";
interface SubItem {
  label: string;
  href: string;
  icon: string;
}
interface NavItem {
  label: string;
  href?: string;
  icon: string;
  subItems?: SubItem[];
}
export default function DropdownMenu({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="text-white md:text-white hover:text-[#F8C32C] transition-colors flex items-center gap-1">
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
}
