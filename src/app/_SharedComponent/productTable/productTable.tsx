"use client";
import { getCartProducts } from "@/app/services/cartAction/getProductCart.action";
import { useEffect } from "react";
import Image from "next/image";
import { cartProduct } from "@/Interface/cartProduct.interface";

interface ProductTableProps {
  cartList: cartProduct[];
  onRemove: (productId: string) => void;
  onUpdateCount: (productId: string, count: number) => void;
}
export default function ProductTable({
  cartList,
  onRemove,
  onUpdateCount,
}: ProductTableProps) {
  async function getProducts() {
    const response = await getCartProducts();
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {cartList.map((product: cartProduct) => {
        return (
          <tr
            key={product?.product?._id}
            className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
          >
            <td className="p-4">
              <Image
                src={product?.product?.imageCover}
                alt={product?.product?.title || "Product"}
                width={200}
                height={180}
                className="h-30 w-30"
              />
            </td>
            <td className="px-6 py-4 font-semibold text-heading">
              {product?.product?.title}
            </td>
            <td className="px-6 py-4">
              <form className="max-w-xs mx-auto">
                <label htmlFor="counter-input-1" className="sr-only">
                  Choose quantity:
                </label>
                <div className="relative flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateCount(product.product._id, product.count - 1);
                    }}
                    id="decrement-button-1"
                    data-input-counter-decrement="counter-input-1"
                    className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                  >
                    <svg
                      className="w-3 h-3 text-heading"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    id="counter-input-1"
                    data-input-counter
                    className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                    value={product?.count}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateCount(product.product._id, product.count + 1);
                    }}
                    id="increment-button-1"
                    data-input-counter-increment="counter-input-1"
                    className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                  >
                    <svg
                      className="w-3 h-3 text-heading"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14m-7 7V5"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </td>
            <td className="px-6 py-4 font-semibold text-heading">
              {product?.price}
            </td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-red-700 font-bold hover:underline"
                onClick={() => {
                  onRemove(product.product._id);
                }}
              >
                Remove
              </a>
            </td>
          </tr>
        );
      })}
    </>
  );
}
