export async function getUserProduct(userId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user orders");
  }

  return data;
}
