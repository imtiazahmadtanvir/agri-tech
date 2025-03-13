import React from "react";
import { IoIosArrowForward } from "react-icons/io";
interface CommonButtonProps {
  children: React.ReactNode;
  className?: string;
  textColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
  icon?: React.ReactNode;
}
export default function CommonButton({
  children,
  className,
  textColor = "text-white",
  bgColor = "bg-[#0D401C]",
  icon = <IoIosArrowForward />,
  hoverBgColor = "hover:bg-[#52320A]",
}: CommonButtonProps) {
  return (
    <button
      className={`${className} ${textColor} ${bgColor} ${
        hoverBgColor === "hover:bg-none" ? "" : hoverBgColor
      } flex items-center p-1.5 rounded-full transition duration-300`}
    >
      <span className="pl-6 pr-7 font-medium">{children}</span>
      <span className="bg-[#F8C32C] p-3 text-xl text-[#0D401C] rounded-full">
        {icon}
      </span>
    </button>
  );
}
