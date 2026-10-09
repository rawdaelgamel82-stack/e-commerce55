"use client";

import { addProducts } from "@/app/services/cartAction/addProductCart.action";
import { toast } from "@/components/ui/toast";
import { cartContext } from "@/context/cartContext";
import { useContext } from "react";

export default function AddBtn({ productId }: { productId: string }) {
  const { setCartNumber } = useContext(cartContext);
  async function addToCard() {
    const response = await addProducts(productId);

    if (response.status == "success") {
      toast.add({
        title: "Success",
        description: "Product Adede  successfully...!",
      });
      setCartNumber(response.numOfCartItems);
    } else {
      toast.add({
        title: "Field",
        description: "there is an error...!",
      });
    }
  }
  return (
    <>
      <button
        onClick={addToCard}
        className="bg-green-600 flex gap-2 items-center text-white px-3 py-1 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        Add to Cart
      </button>
    </>
  );
}
