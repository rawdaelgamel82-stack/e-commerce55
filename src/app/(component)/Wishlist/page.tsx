"use client";
import Image from "next/image";
import { getWishlist } from "@/app/services/wishListAction/getToWishListAction";
import { removeFromWishlist } from "@/app/services/wishListAction/removeToWishListAction";
import { toast } from "@/components/ui/toast";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Iproduct } from "@/Interface/products.interface";
import AddBtn from "@/app/_SharedComponent/AddBtn/AddBtn";
import { FaHeart } from "react-icons/fa";
export default function Wishlist() {
  const [loading, setLoading] = useState(true);
  const [wishlistList, setWishlistList] = useState<Iproduct[]>([]);

  async function getWishlistProducts() {
    try {
      const response = await getWishlist();
      if (response && response.data) {
        setWishlistList(response.data);
      }
    } catch (error) {
      throw new Error("Failed");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getWishlistProducts();
  }, []);
  async function removeItem(productId: string) {
    const response = await removeFromWishlist(productId);
    if (response.status === "success") {
      getWishlistProducts();
      toast.add({
        title: "Success",
        description: "Product removed from wishlist successfully...!",
      });
    } else {
      toast.add({
        title: "Failed",
        description: "There is an error...!",
      });
    }
  }

  return (
    <div className="container w-[95%] md:w-[90%] mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shadow-sm">
          <FaHeart className="w-7 h-7" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
          <p className="text-sm text-gray-500">
            {wishlistList.length} items saved
          </p>
        </div>
      </div>

      {wishlistList.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-100">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-50 text-gray-700 border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Product
                </th>
                <th scope="col" className="px-6 py-4">
                  Price
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlistList.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                        {product.imageCover ? (
                          <Image
                            src={product.imageCover}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xs">
                            No Image
                          </div>
                        )}
                      </div>
                      <div>
                        <Link
                          href={`/Products/${product._id}`}
                          className="font-bold text-gray-900 hover:text-green-600 transition line-clamp-1"
                        >
                          {product.title}
                        </Link>
                        <span className="text-xs text-gray-500 block mt-1">
                          {product.category?.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      In Stock
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <AddBtn productId={product._id} />
                      <button
                        onClick={() => removeItem(product._id)}
                        className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Remove"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-3xl font-bold text-gray-300">
            Your Wishlist Is Empty.....
          </h3>
        </div>
      )}
    </div>
  );
}
