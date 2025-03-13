import PricingCard from "./PricingCard";
import SectionBlock from "@/components/shared/section-block/Section-Block";

const PricingPlans: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <SectionBlock
        shortTitle="Our Specialty"
        title="Premium Quality Rice"
        description="We provide the best quality rice from organic farms."
      ></SectionBlock>
      <div className="flex justify-center gap-6 p-10">

        <PricingCard
          title="Basic Plan"
          price={199}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          items={["1 Buffet table", "Custom Farming rules", "Real-time rate shopping", "100 freight shipments / month"]}
          backgroundColor="#0E4D2D"
          iconType="image"
        />

        <PricingCard
          title="Advance Plan"
          price={299}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          items={["1 Buffet table", "Custom Farming rules", "Real-time rate shopping", "100 freight shipments / month"]}
          backgroundColor="#693B0A"
          iconType="star"
          isBestChoice={true}
        />

        <PricingCard
          title="Premium Plan"
          price={399}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          items={["1 Buffet table", "Custom Farming rules", "Real-time rate shopping", "100 freight shipments / month"]}
          backgroundColor="#093E26"
          iconType="diamond"
        />

      </div>
    </div>
  );
};

export default PricingPlans;
