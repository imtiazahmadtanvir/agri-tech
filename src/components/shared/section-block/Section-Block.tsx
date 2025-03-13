import Image from "next/image";
import React from "react";

interface SectionBlockProps {
  shortTitle: string;
  title: string;
  description: string;
}

const SectionBlock: React.FC<SectionBlockProps> = ({ shortTitle, title, description }) => {
  return (
    <div className="text-center max-w-2xl mx-auto py-6">
      <p className="text-sm text-green-600 font-semibold font-serif">{shortTitle}</p>
      <h2 className="text-3 xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-2">{title}</h2>
      <p className="text-gray-600 mt-2 text-sm">{description}</p>
      <div className="mt-4 flex justify-center">
        <Image src="/rice-ear.webp" width={100} height={10} alt="Rice Ear" />
      </div>
    </div>
  );
};

export default SectionBlock;