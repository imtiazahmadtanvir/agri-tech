import CommonButton from "@/components/shared/common-button/CommonButton";
import Container from "@/components/shared/max-w-container/Container";
import Image from "next/image";
import Link from "next/link";
import {
  FaLeaf,
  FaCheck,
  FaTruck,
  FaHeadset,
  FaChartLine,
  FaShoppingBasket,
  FaShieldAlt,
  FaStore,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="my-16">
      <Container className="px-4 flex flex-col lg:flex-row gap-7" weight={1320}>
        <div className="lg:w-3/4 flex flex-col items-start gap-5">
          <p className="text-[#278D45] font-medium">
            Connecting Farmers & Buyers Since 2020
          </p>
          <h2 className="text-3xl font-bold">
            Your Trusted Agricultural Marketplace
          </h2>
          <p className="text-[#6e7673]">
            AgriConnect is Bangladesh&apos;s premier digital marketplace for
            agricultural products, connecting local farmers directly with buyers
            nationwide.
          </p>
          <ul className="text-[#6e7673] list-disc pl-5 space-y-2">
            <li>Direct farmer-to-buyer transactions</li>
            <li>Verified quality assurance</li>
            <li>Real-time market data</li>
            <li>Secure payment solutions</li>
          </ul>
          <Link href={"/marketplace"} className="w-fit">
            <CommonButton>Join Our Marketplace</CommonButton>
          </Link>
          <div className="w-full h-auto rounded-3xl overflow-hidden bg-gray-100">
            <Image
              width={820}
              height={375}
              alt="Farmers using our marketplace"
              className="object-cover w-full h-full"
              src="/hut.webp"
              priority
            />
          </div>
        </div>

        <div className="lg:w-2/4 space-y-6">
          {/* Stats Card */}
          <div className="bg-[#F8C32C] rounded-2xl p-5">
            <div className="border border-white rounded-2xl border-dashed p-6 text-[#52320A]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-xl">Marketplace Stats</h4>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <FaLeaf className="text-2xl text-[#278D45]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <StatItem
                  value="5,000+"
                  label="Verified Farmers"
                  icon={<FaStore size={30} className="text-[#278D45] mr-1" />}
                />
                <StatItem
                  value="10K+"
                  label="Monthly Transactions"
                  icon={
                    <FaChartLine size={30} className="text-[#278D45] mr-1" />
                  }
                />
                <StatItem
                  value="50+"
                  label="Product Categories"
                  icon={
                    <FaShoppingBasket
                      size={30}
                      className="text-[#278D45] mr-1"
                    />
                  }
                />
                <StatItem
                  value="100%"
                  label="Payment Protection"
                  icon={
                    <FaShieldAlt size={30} className="text-[#278D45] mr-1" />
                  }
                />
              </div>
            </div>
          </div>

          {/* Features Card */}
          <div className="bg-[#0D401C] rounded-2xl p-5">
            <div className="border border-white rounded-2xl border-dashed p-6 text-white">
              <h3 className="text-xl font-medium mb-4">Why Choose Us?</h3>
              <div className="space-y-3">
                <FeatureItem text="Direct from Farm to Market" />
                <FeatureItem text="Competitive Pricing" />
                <FeatureItem text="Quality Assurance" />
                <FeatureItem text="Secure Payments" />
              </div>

              <div className="pt-6 border-t mt-6 border-white/15">
                <h4 className="font-medium mb-3">Our Services</h4>
                <ServiceItem
                  icon={<FaTruck className="text-xl" />}
                  text="Nationwide Logistics"
                />
                <ServiceItem
                  icon={<FaHeadset className="text-xl" />}
                  text="24/7 Customer Support"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

// Reusable components
const StatItem = ({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon?: React.ReactNode;
}) => (
  <div className="flex  items-center gap-2">
    {icon && <span>{icon}</span>}
    <div>
      <h3 className="font-bold text-2xl">{value}</h3>
      <p className="text-sm">{label}</p>
    </div>
  </div>
);

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <FaCheck className="text-[#F8C32C] flex-shrink-0" />
    <p>{text}</p>
  </div>
);

const ServiceItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-center gap-3 mt-3">
    <span className="text-[#F8C32C]">{icon}</span>
    <p>{text}</p>
  </div>
);

export default AboutUs;
