import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

interface PricingCardProps {
  title: string;
  price: number;
  description: string;
  items: string[];
  backgroundColor: string;
  iconType: "image" | "star" | "diamond";
  isBestChoice?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  items,
  backgroundColor,
  iconType,
  isBestChoice = false,
}) => {
  const renderIcon = () => {
    if (iconType === "image") {
      return <Image src="/rice-ear-wh.svg" width={35} height={10} alt="Rice Ear" />;
    } else if (iconType === "star") {
      return <FaStar />;
    } else if (iconType === "diamond") {
      return <IoDiamond />;
    }
    return null;
  };

  return (
    <div className={`relative p-6 rounded-2xl shadow-lg w-96 text-white`} style={{ backgroundColor }}>
      {isBestChoice && (
        <div className="absolute -top-2 right-8 bg-green-600 text-white px-3 py-2 rounded-b-md rounded-tr-md text-xs font-semibold">
          Best Choice
        </div>
      )}
      <h2 className="p-4 text-xl font-bold mb-2 flex items-center gap-2">
      {renderIcon()} {title} 
      </h2>
      <p className="p-4 text-4xl font-extrabold text-yellow-400">${price} <span className="text-lg">/ per month</span></p>
      <p className="p-4 text-sm mt-2 bg-white/10 backdrop-blur-md rounded-xl">{description}</p>
      <ul className="mt-4 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="p-4 py-1 flex items-center space-x-2">
            <span className="bg-yellow-400 rounded-full text-black text-xs px-1">✔</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button className="mt-6 bg-white text-green-800 p-2 pl-5 gap-5 rounded-full flex justify-between items-center">
        Get Started <span className="bg-yellow-400 p-3 rounded-full"><MdArrowForwardIos /></span>
      </button>
    </div>
  );
};

export default PricingCard;
