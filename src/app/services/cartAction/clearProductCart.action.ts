"use server";
import { getMyToken } from "@/Utilities/getMyToken";

export async function clearProducts() {
  const token = await getMyToken();
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "DELETE",
    headers: {
      token: String(token),
    },
  });
  const payLoad = response.json();
  return payLoad;
}
