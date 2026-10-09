import { getCategories } from "@/app/services/Category.sevice";
import { categoryResponse } from "@/Interface/response.type";
import MainSlider from "../MainSlider/MainSlider";
import SectionTitle from "../../SectionTitle/SectionTitle";

export default async function CategorySlider() {
  const data: categoryResponse = await getCategories();

  const imgList = data.data.map((cat) => {
    return {
      path: cat.image,
      name: cat.name,
    };
  });
  const swiperOptions = {
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 50,
      },
    },
  };
  return (
    <div>
      <SectionTitle title={"Category"} subTitle={"Shop By"} />
      <MainSlider isHeader={false} images={imgList} options={swiperOptions} />
    </div>
  );
}
