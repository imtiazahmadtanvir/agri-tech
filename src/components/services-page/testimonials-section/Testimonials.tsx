import SectionBlock from "@/components/shared/section-block/Section-Block";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
    return (
        <section>
            <div>
            <SectionBlock
        shortTitle="Our Specialty"
        title="What Customers Says?"
        description="Testimonials From People Who Have Experienced It."
      ></SectionBlock>
      <div>
        
      </div>
            </div>
        <TestimonialCard></TestimonialCard>
        </section>
    );
};

export default Testimonials;