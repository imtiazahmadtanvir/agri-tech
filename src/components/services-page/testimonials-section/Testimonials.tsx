import SectionBlock from "@/components/shared/section-block/Section-Block";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
    return (
        <section>
            <SectionBlock
        shortTitle="Our Specialty"
        title="Premium Quality Rice"
        description="We provide the best quality rice from organic farms."
      ></SectionBlock>
        <TestimonialCard></TestimonialCard>
        </section>
    );
};

export default Testimonials;