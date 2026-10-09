export async function forgotPassword(email: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
