"use client";
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

interface ImageSliderProps {
  data: string[];
}

export default function ImageSlider({ data }: ImageSliderProps) {
  console.log(data);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#ffff",
            "--swiper-pagination-color": "#ffff",
          } as React.CSSProperties
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {data.map((item, index) => (
          <SwiperSlide className="mb-2" key={index}>
            <div className="w-full relative h-96 object-cover ">
              <Image className="rounded-sm" fill alt="" src={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="w-full relative h-20 object-cover cursor-pointer">
              <Image fill className="rounded-sm" alt="" src={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
