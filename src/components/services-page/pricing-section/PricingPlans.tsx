import PricingCard from "./PricingCard";
import SectionBlock from "@/components/shared/section-block/Section-Block";

const PricingPlans: React.FC = () => {
  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center">
      <SectionBlock
        shortTitle="Pricing Tables"
        title="Pricing Plans For You"
        description="Duis eleifend euismod arcu, nec faucibus mauris finibus id. Integer mattis, tellus non finibus rutrum."
      ></SectionBlock>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

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
