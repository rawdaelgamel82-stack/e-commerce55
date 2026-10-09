import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const payload = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
  const data = await payload.json();
  return NextResponse.json(data);
}
