import Container from "@/components/shared/max-w-container/Container";
import ServiceCard from "./ServiceCard";

const ServicesOverview = () => {
  const data = [
    {
      id: 1,
      title: "We Use New Technology",
      description:
        "Implementing cutting-edge innovations to enhance efficiency, sustainability, and overall user experience in services.",
      image: "/cardBg/service1.png",
    },
    {
      id: 2,
      title: "Making Healthy Foods",
      description:
        "Ensuring fresh, nutritious, and organic ingredients to promote a balanced and healthy lifestyle.",
      image: "/cardBg/service2.png",
    },
    {
      id: 3,
      title: "Reforming The Systems",
      description:
        "Optimizing outdated processes with modern strategies to improve performance, reliability, and accessibility.",
      image: "/cardBg/service3.png",
    },
  ];

  return (
    <section className="bg-[#F8C32C] py-8">
      <Container weight={1320}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4">
          {data.map((item) => (
            <ServiceCard
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServicesOverview;
