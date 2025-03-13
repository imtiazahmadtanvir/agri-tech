import FeaturesOverview from "@/components/services-page/features-section/FeaturesOverview";
import PricingPlans from "@/components/services-page/pricing-section/PricingPlans";
import ServicesBanner from "@/components/services-page/services-banner/ServicesBanner";
import Testimonials from "@/components/services-page/testimonials-section/Testimonials";

const ServicesPage = () => {
    return (
        <div>
            <FeaturesOverview></FeaturesOverview>
            <ServicesBanner></ServicesBanner>
            <PricingPlans></PricingPlans>
            <Testimonials></Testimonials>
        </div>
    );
};

export default ServicesPage;