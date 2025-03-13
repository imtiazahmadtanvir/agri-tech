import Image from "next/image";

const PageCover = ({ location }: { location: string }) => {
  return (
    <div className="relative w-full h-72 md:h-76">
      <Image
        src="/contact-banner.png"
        alt="Contact Us Banner"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 bg-opacity-80"></div>

      {/* Content */}
      <div className="relative flex flex-col justify-center items-start space-y-2 mx-auto w-8/12 h-full text-white text-center">
        <p className="text-yellow-400 text-xs md:text-xs">
          Contact Us Today To Work Together
        </p>
        <h1 className="font-bold text-3xl md:text-4xl">CONTACT US</h1>
        <div className="bg-yellow-400 my-2 w-24 h-1"></div>
        <div className="mt-6 md:mt-10 text-sm md:text-base">
          <span className="font-bold text-gray-300">
            {location.split("/")[0]}
          </span>{" "}
          ➝{" "}
          <span className="font-bold text-gray-300">
            {location.split("/")[1]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageCover;
