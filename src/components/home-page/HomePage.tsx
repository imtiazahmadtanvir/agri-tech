import HeroBanner from "./hero-section/HeroBanner";
import ServicesOverview from "./services-section/ServicesOverview";

const HomePage = () => {
  return (
    <section className="-z-20">
      <HeroBanner />
      <ServicesOverview />
    </section>
  );
};

export default HomePage;
