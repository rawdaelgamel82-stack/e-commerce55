import { getProducts } from "@/app/services/Product.sercices";
import { productsResponse } from "@/Interface/response.type";
import { Iproduct } from "@/Interface/products.interface";
import Card from "@/app/_SharedComponent/Card/Card";

export default async function Categories() {
  const products: productsResponse = await getProducts();

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-green-700 mb-8">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products.data?.map((product: Iproduct) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
