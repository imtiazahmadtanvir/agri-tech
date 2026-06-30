import HeroBanner from "./hero-section/HeroBanner";
import ServicesOverview from "./services-section/ServicesOverview";
import StatsOverview from "./stats-section/StatsOverview";
import FAQSection from "./FAQ-section/FAQSection";
import AboutUs from "./about-us-section/AboutUs";
import OurProcess from "./our-process-section/OurProcess";

import PatnerSection from "./patner-section/partner-section";

import FeturesProducts from "../FeturesProducts";

const HomePage = () => {
  return (
    <section className="relative ">
      <HeroBanner />
      <OurProcess />
      <FeturesProducts />
      <ServicesOverview />
      <AboutUs />
      <StatsOverview />
      <FAQSection />
      {/* <BrowseCategories />
      <BlogSection /> */}
      <PatnerSection />
    </section>
  );
};

export default HomePage;
