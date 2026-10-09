"use server";
import { getMyToken } from "@/Utilities/getMyToken";
type ttttttt = {
  city: string;
  phone: string;
  details: string;
  postalCode: string;
};

export async function cashOrder(cardId: string, formData: ttttttt) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/${cardId}`,
    {
      method: "POST",
      headers: {
        token: String(token),
        "content-type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress: formData,
      }),
    },
  );
  const payLoad = response.json();
  return payLoad;
}
