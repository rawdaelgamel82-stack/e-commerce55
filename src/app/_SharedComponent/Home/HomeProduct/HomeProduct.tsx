import React from "react";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { getProducts } from "@/app/services/Product.sercices";
import { productsResponse } from "@/Interface/response.type";
import { Iproduct } from "@/Interface/products.interface";
import Card from "../../Card/Card";

export default async function HomeProduct() {
  const products: productsResponse = await getProducts();

  return (
    <div className="mt-5">
      <SectionTitle title={"Products"} subTitle={"Feature"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-5">
        {products.data?.map((product: Iproduct) => {
          return (
            <div>
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
