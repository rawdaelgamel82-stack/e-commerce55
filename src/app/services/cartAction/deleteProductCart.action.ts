"use server";
import { getMyToken } from "@/Utilities/getMyToken";

export async function deleteProducts(productId: string) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
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
