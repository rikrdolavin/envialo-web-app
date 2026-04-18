import { NextRequest, NextResponse } from "next/server";
import { getProductDetails } from "@/lib/products";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Missing product ID" },
      { status: 400 },
    );
  }

  const result = await getProductDetails(id);
  return NextResponse.json(result);
}
