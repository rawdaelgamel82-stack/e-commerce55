export async function specificCategory(categoryId: string) {
  try {
    const categoryResponse = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,
    );

    const categoryData = await categoryResponse.json();

    const productsResponse = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
    );

    const productsData = await productsResponse.json();

    return {
      category: categoryData.data,
      products: productsData.data,
    };
  } catch (error) {
    throw error;
  }
}
