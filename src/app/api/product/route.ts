import { getProducts } from "@/lib/products";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 24);

    const products = await getProducts({
      page,
      pageSize,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: (error as { message: string }).message },
      { status: 400 },
    );
  }
}
