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
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <>
      <div className="relative group border rounded-2xl">
        <Swiper
          style={
            {
              "--swiper-navigation-color": "#072010",
              "--swiper-pagination-color": "#072010",
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
            <SwiperSlide className=" " key={index}>
              <div className="w-full relative rounded-xl  h-[500px]  ">
                <Image className="object-contain" fill alt="" src={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-7"
      >
        {data.map((item, index) => (
          <SwiperSlide className="rounded-2xl" key={index}>
            <div className="w-full relative h-20   cursor-pointer border rounded-2xl">
              <Image
                fill
                className="rounded-sm object-contain"
                alt=""
                src={item}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
