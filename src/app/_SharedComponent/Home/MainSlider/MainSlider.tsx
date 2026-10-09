"use client";
import Image, { StaticImageData } from "next/image";
import img1 from "../../../../assets/food.jpg";
import img2 from "../../../../assets/food1.jpg";
import img3 from "../../../../assets/food.2jpg.webp";
import img4 from "../../../../assets/food.jpg";
import img5 from "../../../../assets//food1.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Iimages {
  path: string | StaticImageData;
  name?: string;
}
export default function MainSlider({
  images,
  options,
  isHeader,
}: {
  isHeader: boolean;
  images: Iimages[];
  options: any;
}) {
  const imgList = [img1, img2, img3, img4, img5];
  const swiperOptions = {
    loop: true,
  };
  return (
    <div>
      <Swiper {...swiperOptions} {...options}>
        {images.map((slide: Iimages) => {
          return (
            <SwiperSlide>
              <Image
                src={slide.path}
                alt="...."
                className={isHeader ? "w-full h-100" : "h-50"}
                width={1290}
                height={180}
              />
              <h4>{slide?.name}</h4>
            </SwiperSlide>
          );
        })}
        ...
      </Swiper>
    </div>
  );
}
