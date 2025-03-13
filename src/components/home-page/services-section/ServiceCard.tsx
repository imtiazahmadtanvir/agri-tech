import Image from "next/image";

type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <section className="">
      <div className="">
        <Image
          width={460}
          height={545}
          src={image}
          style={{ borderRadius: "20px" }}
          alt="service photo"
        />
      </div>
    </section>
  );
};

export default ServiceCard;
