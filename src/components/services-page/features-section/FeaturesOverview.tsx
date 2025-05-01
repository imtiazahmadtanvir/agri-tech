import SectionBlock from "@/components/shared/section-block/Section-Block";
import FeatureCard from "./FeatureCard";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";

const FeaturesOverview = () => {
  return (
    <section className="my-10 flex flex-col lg:flex-row items-center justify-center">
      <FeatureCard></FeatureCard>
      <div className="p-10">
        <SectionBlock
          shortTitle="Our Commitment To Freshness"
          title="We Always Bring The Best Products To Consumers"
          description="Duis eleifend euismod arcu, nec faucibus mauris finibus id. Integer mattis, tellus non finibus rutrum."
        ></SectionBlock>
        <li className="p-4 py-1 flex items-center space-x-2">
          <span className="bg-green-800 rounded-full text-white text-xs px-1">
            ✔
          </span>
          <span>We are committed to not using pesticides</span>
        </li>
        <li className="p-4 py-1 flex items-center space-x-2">
          <span className="bg-green-800 rounded-full text-white text-xs px-1">
            ✔
          </span>
          <span>Do not use preservatives</span>
        </li>
        <li className="p-4 py-1 flex items-center space-x-2">
          <span className="bg-green-800 rounded-full text-white text-xs px-1">
            ✔
          </span>
          <span>Fresh Fruits & Vegetables</span>
        </li>
        <li className="p-4 py-1 flex items-center space-x-2">
          <span className="bg-green-800 rounded-full text-white text-xs px-1">
            ✔
          </span>
          <span>Low price guaranteed with quality</span>
        </li>
        <li className="p-4 py-1 flex items-center space-x-2">
          <span className="bg-green-800 rounded-full text-white text-xs px-1">
            ✔
          </span>
          <span>Environmental protection is the focus</span>
        </li>
        <Link
          href={"/marketplace"}
          className="mt-6 w-fit bg-green-900 text-white p-2 pl-5 gap-5 rounded-full flex justify-between items-center"
        >
          View Shop{" "}
          <span className="bg-yellow-400 p-3 rounded-full">
            <MdArrowForwardIos />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default FeaturesOverview;
