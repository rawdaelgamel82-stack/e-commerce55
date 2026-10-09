"use server";
import { getMyToken } from "@/Utilities/getMyToken";

export async function getCartProducts() {
  const token = await getMyToken();
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers: {
      token: String(token),
    },
  });
  const payLoad = response.json();
  return payLoad;
}
