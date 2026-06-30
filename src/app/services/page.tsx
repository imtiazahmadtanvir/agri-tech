import FeaturesOverview from "@/components/services-page/features-section/FeaturesOverview";
import ServicesBanner from "@/components/services-page/services-banner/ServicesBanner";
import Testimonials from "@/components/services-page/testimonials-section/Testimonials";

const ServicesPage = () => {
  return (
    <div>
      <FeaturesOverview></FeaturesOverview>
      <ServicesBanner></ServicesBanner>
      <Testimonials></Testimonials>
    </div>
  );
};

export default ServicesPage;
