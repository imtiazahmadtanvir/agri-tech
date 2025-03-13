import Image from "next/image";

import FAQItem from "./FAQItem";
// import { RiGhost2Fill } from "react-icons/ri";
import CommonButton from "@/components/shared/common-button/CommonButton";

const FAQSection = () => {
  return (
    <div className="w-11/12 flex flex-col md:flex-row items-center gap-10 justify-center  mx-auto mt-24 mb-24">
      <div className="justify-start">
        <h4 className=" font-semibold text-[#278D45] ">
          Frequently Asked Questions
        </h4>
        <h2 className="text-2xl font-bold text-[60px]">
          Most Frequently Asked <br /> Questions About The Farm.
        </h2>
        <p className="mt-6 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales
          faucibus.
        </p>
        <FAQItem />
      </div>
      <div className="bg-[#278D45] width={500} height={500} rounded-3xl">
        <Image
          src="/images/faq person image.svg"
          alt="FAQ Person"
          width={500}
          height={500}
        />
        <div className="bg-green-600 text-white p-6 rounded-lg flex flex-col items-start gap-4">
          <p className="text-xl font-medium">
            You didn’t find your question? See more <br /> questions and ask us
            today?
          </p>
          <CommonButton
            bgColor="bg-white"
            textColor="text-black"
            className="border border-white hover:text-white w-fit"
            hoverBgColor="hover:bg-transparent"
          >
            See Our Services
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
