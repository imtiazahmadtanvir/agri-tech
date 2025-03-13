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
    <section className="rounded-3xl">
      <div className="relative overflow-hidden h-fit w-fit">
        <Image
          width={460}
          height={545}
          src={image}
          style={{ borderRadius: "20px", objectFit: "cover" }}
          alt="service photo"
        />
        {/* Overlay */}
        <div className="absolute rounded-3xl inset-0 bg-gradient-to-t from-[rgba(13,64,28,0.89)] via-[rgba(13,64,28,0.20)] to-transparent"></div>
        <div className="absolute w-full flex justify-center  items-center bottom-0 p-4">
          {" "}
          <h2 className="text-center bg-white rounded-[15px] px-8 py-4 w-full  text-2xl">
            {title}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ServiceCard;
