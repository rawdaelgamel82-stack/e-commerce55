'use server'
import { getMyToken } from "@/Utilities/getMyToken";

export async function updateProducts(productId: string, count: number) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        token: String(token),
        "content-type": "application/json",
      },
      body: JSON.stringify({
        count: count,
      }),
    },
  );
  const payLoad = response.json();
  return payLoad;
}
