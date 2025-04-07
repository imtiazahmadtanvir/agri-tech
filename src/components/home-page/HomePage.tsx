import HeroBanner from "./hero-section/HeroBanner";
import ServicesOverview from "./services-section/ServicesOverview";
import StatsOverview from "./stats-section/StatsOverview";
import FAQSection from "./FAQ-section/FAQSection";
import AboutUs from "./about-us-section/AboutUs";
import { BrowseCategories } from "./category-section/BrowseCategories";
import BlogSection from "./blog-section/blog-section";
import PatnerSection from "./patner-section/partner-section";

const HomePage = () => {
  return (
    <section className="relative ">
      <HeroBanner />
      <ServicesOverview />
      <AboutUs />
      <StatsOverview />
      <FAQSection />
      <BrowseCategories />
      <BlogSection />
      <PatnerSection />
    </section>
  );
};

export default HomePage;
