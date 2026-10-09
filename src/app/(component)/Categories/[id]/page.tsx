import Card from "@/app/_SharedComponent/Card/Card";
import { specificCategory } from "@/app/services/specificCategory";
import { Iproduct } from "@/Interface/products.interface";

export default async function SpecificCategory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await specificCategory(id);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        {response.category.name}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {response.products?.map((product: Iproduct) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
