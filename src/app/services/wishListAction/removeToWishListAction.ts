"use server";
import { getMyToken } from "@/Utilities/getMyToken";

export async function removeFromWishlist(productId: string) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: String(token),
        "content-type": "application/json",
      },
    },
  );
  const payLoad = response.json();
  return payLoad;
}
