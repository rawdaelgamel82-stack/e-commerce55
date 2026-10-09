export async function getProductsByBrand(brandId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand[in]=${brandId}`,
    );

    if (!response.ok) {
      throw new Error("Error occurred");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}
