"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import StatCard from "./StatCard";
import Image from "next/image";

interface Testimonial {
  title: string;
  name: string;
  role: string;
  message: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    title: "The Best Farm I Trust Uses Products",
    name: "CHRISTINE ROSE",
    role: "Director, Radical Orange Pty Ltd.",
    message:
      "Having been a host farmer for three seasons, we've seen firsthand the difference this internship makes in beginning farmers and host farms alike.",
    image: "https://i.ibb.co.com/tcRQDCQ/depositphotos-179308454-stock-illustration-unknown-person-silhouette-glasses-profile.webp",
  },
  {
    title: "Rogue Farm Corps Has Helped Us Recruit And Retain Great! ",
    name: "SINCERELY",
    role: "General Agriculture Crop Consultant.",
    message:
      "As you know I am an organic wheat farmer here in Wyoming and we had one of driest and coldest winters on record.",
    image: "https://i.ibb.co.com/Vc3Tx49K/download-3.jpg",
  },
  {
    title: "The Best Farm I Trust Uses Products",
    name: "CHRISTINE ROSE",
    role: "Director, Radical Orange Pty Ltd.",
    message:
      "Having been a host farmer for three seasons, we've seen firsthand the difference this internship makes in beginning farmers and host farms alike.",
    image: "https://i.ibb.co.com/q3NHPMxG/Add-a-subheading.jpg",
  },
  {
    title: "Rogue Farm Corps Has Helped Us Recruit And Retain Great! ",
    name: "SINCERELY",
    role: "General Agriculture Crop Consultant.",
    message:
      "As you know I am an organic wheat farmer here in Wyoming and we had one of driest and coldest winters on record.",
    image: "https://i.ibb.co.com/k1GXKQP/how-to-create-online-course.png",
  },
  {
    title: "The Best Farm I Trust Uses Products",
    name: "JOHN DOE",
    role: "Farm Owner, Green Fields Ltd.",
    message:
      "Interns bring fresh ideas and energy, and our farm has benefited immensely from their contributions.",
    image: "https://i.ibb.co.com/xzPmjjV/images.jpg",
  },
  {
    title: "Rogue Farm Corps Has Helped Us Recruit And Retain Great! ",
    name: "JANE SMITH",
    role: "Agricultural Scientist",
    message:
      "Working with young professionals has helped advance our sustainable farming techniques.",
    image: "https://i.ibb.co.com/z2zPJSJ/How-to-create-an-online-course-jpg.webp",
  },
];

const TestimonialCard: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const [isHoveredPrev, setIsHoveredPrev] = useState(false);
  const [isHoveredNext, setIsHoveredNext] = useState(false);

  return (
    <section className="w-full py-10 relative flex justify-center items-center">
      <Image
        src={isHoveredPrev ? "/icons/arrow.svg" : "/icons/arrow hover.svg"}
        alt="Previous"
        width={50}
        height={50}
        className="absolute left-0 z-10 cursor-pointer transform scale-x-[-1]"
        onClick={() => swiperRef.current?.slidePrev()}
        onMouseEnter={() => setIsHoveredPrev(true)}
        onMouseLeave={() => setIsHoveredPrev(false)}
      />
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        navigation={false}
        modules={[Navigation]}
        className="mySwiper w-3/4"
        breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 2 },
          }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <StatCard {...testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Image
        src={isHoveredNext ? "/icons/arrow.svg" : "/icons/arrow hover.svg"}
        alt="Next"
        width={50}
        height={50}
        className="absolute right-0 z-10 cursor-pointer"
        onClick={() => swiperRef.current?.slideNext()}
        onMouseEnter={() => setIsHoveredNext(true)}
        onMouseLeave={() => setIsHoveredNext(false)}
      />
    </section>
  );
};

export default TestimonialCard;