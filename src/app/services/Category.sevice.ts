export async function getCategories() {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories`,
    );
    if (!response.ok) {
      throw new Error("error occured");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
