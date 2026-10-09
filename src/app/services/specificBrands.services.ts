export async function specificBrands(BrandId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${BrandId}`,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
