import Link from "next/link";
import Image from "next/image";
import { getBrands } from "@/app/services/Brands.services";

export default async function Brands() {
  const response = await getBrands();

  return (
    <div className="container mx-auto mt-10 ">
      <h1 className="text-3xl font-bold text-green-700 mb-8">All Brands</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4 ">
        {response.data?.map((brand: any) => (
          <Link
            key={brand._id}
            href={`/Brands/${brand._id}`}
            className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-5 text-center block"
          >
            <div className="h-32 flex items-center justify-center bg-gray-50 rounded-lg mb-4">
              <Image
                src={brand.image}
                alt={brand.name}
                width={150}
                height={100}
                className="max-h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <h2 className="font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-200">
              {brand.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
