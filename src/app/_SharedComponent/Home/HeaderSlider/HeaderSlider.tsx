"use client";
import Image from "next/image";
import img1 from "../../../../assets/food.jpg";
import img2 from "../../../../assets/food1.jpg";
import img3 from "../../../../assets/food.2jpg.webp";
import img4 from "../../../../assets/food.jpg";
import img5 from "../../../../assets//food1.jpg";

import MainSlider from "../MainSlider/MainSlider";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";

export default function HeaderSlider() {
  const imgList = [
    { path: img1 },
    { path: img2 },
    { path: img3 },
    { path: img4 },
    { path: img5 },
  ];
  const swiperOptions = {
    slidesPerView: 1,
    pagination: {
      clickable: true,
      bulletActiveClass: "swiper-pagination-bullet-active !bg-green-500",
    },
    modules: [Pagination],
  };
  return (
    <div className="mb-8 my-20">
      <MainSlider isHeader={true} images={imgList} options={swiperOptions} />
    </div>
  );
}
