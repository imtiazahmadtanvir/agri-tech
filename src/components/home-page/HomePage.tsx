import Image from "next/image";
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
    <section className="relative">
      <HeroBanner />

      <div className="relative -mt-2.5 lg:-mt-5 z-20">
        <Image
          style={{ width: "100%" }}
          alt="Service Mask"
          width={1920}
          height={10}
          className="absolute top-0 left-0 z-20"
          src={"/shapes/serviceMask.svg"}
        />
      </div>
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
