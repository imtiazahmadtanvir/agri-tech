"use client";

import Image from "next/image";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import CommonButton from "@/components/shared/common-button/CommonButton";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

interface SlideData {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  image: string;
}

const HeroBanner: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const data: SlideData[] = [
    {
      id: 1,
      title: "Agriculture that works for the future",
      subTitle: "Better agriculture for a better future",
      description:
        "We provide high-quality agricultural products, ensuring sustainability, improved yields, and a prosperous future for farmers and consumers worldwide.",
      image: "/slider/slide1.webp",
    },
    {
      id: 2,
      title: "Every day is a good day to be a farmer",
      subTitle: "Better agriculture for a better future",
      description:
        "Farming is the backbone of life, providing fresh, organic food while supporting communities, innovation, and environmental conservation for future generations.",
      image: "/slider/slide2.webp",
    },
    {
      id: 3,
      title: "Every crop counts, Every farmer matters",
      subTitle: "Better agriculture for a better future",
      description:
        "Empowering farmers with knowledge, technology, and resources to cultivate healthier crops, ensuring global food security and a sustainable future.",
      image: "/slider/slide3.webp",
    },
  ];

  return (
    <section className="relative z-30">
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-[600px] ">
              <Image
                src={item.image}
                alt="slide"
                fill
                className="object-cover"
              />
              <div className="absolute bg-black/40 inset-0 "></div>
              <div className="absolute inset-0 max-w-[1320px] flex flex-col mx-auto justify-center gap-9 text-white p-6">
                <div className="max-w-3xl lg:max-w-[630px] space-y-9">
                  <h2 className="text-sm text-[#F8C32C]">{item.subTitle}</h2>
                  <h1 className="text-5xl/tight font-bold uppercase">
                    {item.title}
                  </h1>
                </div>
                <p className="text-sm max-w-[580px]">{item.description}</p>
                <CommonButton
                  bgColor="bg-white"
                  textColor="text-black"
                  className="border border-white hover:text-white w-fit"
                  hoverBgColor="hover:bg-transparent"
                >
                  See Our Services
                </CommonButton>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="custom-prev absolute left-5 top-1/2 transform -translate-y-1/2  text-white p-3 rounded-full cursor-pointer z-10"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="81"
          viewBox="0 0 80 81"
          fill="none"
          className="transition-all duration-300 hover:fill-red-500 stroke-red-500"
        >
          <path
            d="M3.9389 39.2647C29.1228 40.9085 54.3099 41.2662 79.5035 39.2039C79.5197 39.3159 79.5351 39.427 79.5513 39.539C79.3834 39.6047 79.2187 39.711 79.0467 39.7312C76.066 40.089 73.086 40.4549 70.1028 40.7859C56.1589 42.3209 42.1751 42.4086 28.1898 42.1295C20.5991 41.977 13.0126 41.5445 5.42442 41.237C5.15343 41.2257 4.88327 41.237 4.48005 41.237C7.78938 44.187 11.162 46.8351 14.2693 49.8669L14.1371 50.1168C13.9383 50.0235 13.7241 49.9586 13.5432 49.8321C10.6117 47.793 7.68282 45.7501 4.7567 43.7034C3.61275 42.9051 2.47205 42.0995 1.31351 41.3295C0.177673 40.5734 0.0916672 39.7637 1.13826 38.8323C1.67067 38.3474 2.2564 37.9244 2.8842 37.5715C6.85475 35.4145 10.8348 33.2808 14.8242 31.1703C15.2859 30.9425 15.7862 30.8032 16.2992 30.7598C16.5061 30.7379 16.859 30.9853 16.9263 31.2003C16.9937 31.4153 16.8606 31.8494 16.6903 32.0003C16.3422 32.3167 15.9187 32.5341 15.5106 32.7524C11.6401 34.8277 7.76748 36.8979 3.89266 38.9629C3.91132 39.0635 3.92592 39.1641 3.9389 39.2647Z"
            fill="white"
            stroke="white"
            strokeWidth="0.81131" // Changed from stroke-width
            strokeMiterlimit="10" // Changed from stroke-miterlimit
            strokeLinecap="round" // Changed from stroke-linecap
          />
        </svg>
      </button>
      <button
        className="custom-next absolute right-5 top-1/2 transform -translate-y-1/2  text-white p-3 rounded-full cursor-pointer z-10"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path
            d="M76.0612 41.2352C50.8773 39.5915 25.6902 39.2337 0.496597 41.296C0.480371 41.1841 0.464957 41.0729 0.44873 40.961C0.616672 40.8953 0.781368 40.789 0.953365 40.7687C3.93412 40.4109 6.91406 40.045 9.89724 39.714C23.8412 38.179 37.825 38.0914 51.8103 38.3705C59.4009 38.523 66.9875 38.9554 74.5757 39.2629C74.8466 39.2743 75.1168 39.2629 75.52 39.2629C72.2107 36.313 68.8381 33.6649 65.7308 30.633L65.863 30.3831C66.0618 30.4764 66.276 30.5413 66.4569 30.6679C69.3884 32.707 72.3173 34.7499 75.2434 36.7965C76.3873 37.5948 77.528 38.4005 78.6866 39.1704C79.8224 39.9266 79.9084 40.7362 78.8618 41.6676C78.3294 42.1526 77.7437 42.5755 77.1159 42.9284C73.1453 45.0854 69.1653 47.2191 65.1758 49.3296C64.7142 49.5575 64.2139 49.6967 63.7009 49.7402C63.494 49.7621 63.1411 49.5146 63.0737 49.2996C63.0064 49.0846 63.1394 48.6506 63.3098 48.4997C63.6579 48.1833 64.0814 47.9658 64.4895 47.7476C68.3599 45.6722 72.2326 43.6021 76.1074 41.537C76.0888 41.4364 76.0742 41.3358 76.0612 41.2352Z"
            fill="white"
            stroke="white"
            strokeWidth="0.81131" // Changed from stroke-width
            strokeMiterlimit="10" // Changed from stroke-miterlimit
            strokeLinecap="round" // Changed from stroke-linecap
          />
        </svg>
      </button>
    </section>
  );
};

export default HeroBanner;
