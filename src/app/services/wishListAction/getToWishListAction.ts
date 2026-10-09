"use server";
import { getMyToken } from "@/Utilities/getMyToken";

export async function getWishlist() {
  const token = await getMyToken();
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    headers: {
      token: String(token),
    },
  });
  const payLoad = response.json();
  return payLoad;
}
