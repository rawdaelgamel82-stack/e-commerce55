"use server";
import { getMyToken } from "@/Utilities/getMyToken";
type checkOut = {
  city: string;
  phone: string;
  details: string;
};

export async function checkOutSession(cardId: string, formData: checkOut) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:3000`,
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
