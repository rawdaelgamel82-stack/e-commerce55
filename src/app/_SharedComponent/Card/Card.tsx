"use client";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt, FaHeart, FaEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { Iproduct } from "@/Interface/products.interface";
import AddBtn from "../AddBtn/AddBtn";
import { addToWishlist } from "@/app/services/wishListAction/addToWishListAction";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { removeFromWishlist } from "@/app/services/wishListAction/removeToWishListAction";

export default function Card({ product }: { product: Iproduct }) {
  const [isFavorite, setIsFavorite] = useState(false);
  async function handleToggleWishlist(productId: string) {
    if (isFavorite) {
      const response = await removeFromWishlist(productId);
      if (response?.status === "success") {
        setIsFavorite(false);
        toast.add({
          title: "Success",
          description: "Product removed from wishlist successfully...!",
        });
      } else {
        toast.add({
          title: "Failed",
          description: "Could not remove from wishlist...!",
        });
      }
    } else {
      const response = await addToWishlist(productId);
      if (response?.status === "success") {
        setIsFavorite(true);
        toast.add({
          title: "Success",
          description: "Product added to wishlist successfully...!",
        });
      } else {
        toast.add({
          title: "Failed",
          description: "Could not add to wishlist...!",
        });
      }
    }
  }
  return (
    <div>
      <div
        key={product.id}
        className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col justify-between"
      >
        <Link href={`/Products/${product._id}`}>
          <div className="relative w-full h-80 overflow-hidden bg-gray-50">
            {product.imageCover ? (
              <Image
                src={product.imageCover}
                alt={product.title}
                width={300}
                height={180}
                className="w-full"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleWishlist(product._id);
                }}
                className={`p-2.5 rounded-full shadow-md transition-colors duration-200 flex items-center justify-center
             `}
                title={isFavorite ? "In Wishlist" : "Add to Wishlist"}
              >
                {isFavorite ? (
                  <FaHeart className="w-5 h-5 text-red-700" />
                ) : (
                  <CiHeart className="w-6 h-6 font-bold" />
                )}
              </button>

              <Link
                href={`/Products/${product._id}`}
                className="p-2.5 rounded-full shadow-md transition-colors duration-200 flex items-center justify-center bg-white text-gray-500 hover:bg-gray-100"
                title="View Details"
              >
                <FaEye className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              {product.category.name}
            </span>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-2">
              {product.title}
            </h3>
            <div className="text-amber-500 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
              <span className="text-slate-500">({product.ratingsAverage})</span>
            </div>

            <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-100">
              <span className="text-lg font-extrabold text-gray-900">
                {product.price} EGP
              </span>
            </div>
          </div>
        </Link>
        <div className="py-2 flex justify-center">
          <AddBtn productId={product._id} />
        </div>
      </div>
    </div>
  );
}
