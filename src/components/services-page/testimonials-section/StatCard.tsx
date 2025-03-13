import Image from "next/image";
import React from "react";

interface Props {
    title: string;
  name: string;
  role: string;
  message: string;
  image: string;
}

const StatCard: React.FC<Props> = ({title, name, role, message, image }) => {
  return (
    <div className="border rounded-lg p-5 shadow-lg flex flex-col h-80 mx-5">
        <p className="font-bold">{title}</p>
        <p className="italic">{message}</p>
      <div className="flex items-center gap-5 my-5">
      <div className="w-16 h-16 relative">
          <Image src={image} alt={name} width={70} height={70} className="rounded-full object-cover w-20 h-20" />
        </div>
      
      <div>
      <div className="flex items-center gap-5">
      <h3 className="font-bold">{name}</h3>
      <Image src={"/icons/star.svg"} alt={name} width={90} height={20} />
      </div>
      <p className="text-sm text-gray-500 my-4">{role}</p>
      </div>
      </div>
    </div>
  );
};

export default StatCard;