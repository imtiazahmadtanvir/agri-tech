import PricingPlans from "@/components/services-page/pricing-section/PricingPlans";
import ServicesBanner from "@/components/services-page/services-banner/ServicesBanner";
import Testimonials from "@/components/services-page/testimonials-section/Testimonials";

const ServicesPage = () => {
    return (
        <div>
            <h1>Services Page</h1>
            <ServicesBanner></ServicesBanner>
            <PricingPlans></PricingPlans>
            <Testimonials></Testimonials>
        </div>
    );
};

export default ServicesPage;