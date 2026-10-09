"use client";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { useState } from "react";
import { Swiper as inst } from "swiper/types";

export default function DetailsSlider({ imgList }: { imgList: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<inst | null>(null);
  return (
    <div>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {imgList.map((src, i) => {
          return (
            <SwiperSlide>
              <Image
                src={src}
                alt={`src/${i}`}
                key={i}
                width={300}
                height={180}
                className="w-full max-h-100"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {imgList.map((src, i) => {
          return (
            <SwiperSlide>
              <Image
                src={src}
                alt={`src/${i}`}
                key={i}
                width={300}
                height={180}
                className="max-h-30"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
