import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import axios from "axios";

export async function POST(req: Request) {
  const { pdfId, content } = await req.json();
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const pdf = await db.pDF.findUnique({
      where: { id: pdfId },
      include: { messages: true },
    });

    if (!pdf) {
      return NextResponse.json({ message: "PDF not found" }, { status: 404 });
    }

    const flaskResponse = await axios.post("http://127.0.0.1:5000", {
      //@ts-ignore
      text: pdf.text,
      //@ts-ignore
      image_text: pdf.image_text,
      messages: pdf.messages,
      content: content,
    });

    if (flaskResponse.status !== 200) {
      return NextResponse.json({ message: "AI server error" }, { status: 501 });
    }

    const { data } = flaskResponse;

    return NextResponse.json({ response: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
