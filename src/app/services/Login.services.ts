"use server";
import { cookies } from "next/headers";
export interface LoginPayload {
  email: string;
  password: string;
}
export async function LoginForm(payload: LoginPayload) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/signin`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "content-type": "application/json" },
    },
  );
  const data = await response.json();
  const cookie = await cookies();
  cookie.set("userToken", data.token, {
    httpOnly: true,
  });
  return data;
}
