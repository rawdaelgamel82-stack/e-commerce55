"use server";
import { getMyToken } from "@/Utilities/getMyToken";

export async function addToWishlist(productId: string) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
      method: "POST",
      headers: {
        token: String(token),
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
      }),
    },
  );
  const payLoad = response.json();
  return payLoad;
}
