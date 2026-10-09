import Card from "@/app/_SharedComponent/Card/Card";
import { getProductsByBrand } from "@/app/services/getProductsByBrand";
import { specificBrands } from "@/app/services/specificBrands.services";

import { Iproduct } from "@/Interface/products.interface";

export default async function SpecificBrand({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const brandResponse = await specificBrands(id);
  const productsResponse = await getProductsByBrand(id);
  const products: Iproduct[] = productsResponse?.data || [];
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        {brandResponse.data?.name}
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Iproduct) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
          <p className="text-xl font-semibold text-gray-600 mb-2">
            No products found for this brand yet!
          </p>
          <p className="text-gray-400 text-sm">
            Please check back later or explore other brands.
          </p>
        </div>
      )}
    </div>
  );
}
