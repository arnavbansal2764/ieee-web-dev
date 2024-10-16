import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { PDFId, embeddings } = await req.json();

  if (!PDFId || !Array.isArray(embeddings)) {
    return NextResponse.json({ message: "Incomplete Data" }, { status: 404 });
  }

  try {
    for (const embed of embeddings) {
      if (Array.isArray(embed)) {
        await db.embed.create({
          data: {
            pdfId: PDFId,
            embeds: embed,
          },
        });
      }
    }
    return NextResponse.json(
      { message: "Embeddings stored successfully" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
