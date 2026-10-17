import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename") || `product-${Date.now()}.png`;

  if (!request.body) {
    return NextResponse.json({ error: "No body provided" }, { status: 400 });
  }

  try {
    // Direct server-side upload to Vercel Blob
    const blob = await put(filename, request.body, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Vercel Blob server-side upload error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
