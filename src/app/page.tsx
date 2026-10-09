import Image from "next/image";
import HeaderSlider from "./_SharedComponent/Home/HeaderSlider/HeaderSlider";
import CategorySlider from "./_SharedComponent/Home/CategorySlider/CategorySlider";
import HomeProduct from "./_SharedComponent/Home/HomeProduct/HomeProduct";

export default function Home() {
  return (
    <div className="w-[95%] mx-auto ">
      {/* header slider */}
      <HeaderSlider />

      {/* category slider */}
      <CategorySlider />

      {/* products */}
      <HomeProduct />
    </div>
  );
}
