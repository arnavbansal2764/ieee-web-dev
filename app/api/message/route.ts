import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import axios from "axios";

export async function POST(req: Request) {
  const { pdfId, content,sender } = await req.json();
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
      return NextResponse.json({ message: 'PDF not found' }, { status: 404 });
    }
    const newMessage = await db.message.create({
      data: {
        content,
        sender,
        pdf: {
          connect: {
            id: pdfId,
          },
        },
      },
    });
    if (!pdf) {
      return NextResponse.json({ message: "PDF not found" }, { status: 404 });
    }

    const flaskResponse = await axios.post("http://127.0.0.1:5000/message", {
      text: pdf.text,
      image_text: pdf.image_text,
      messages: pdf.messages,
      userQuery: content,
    });

    if (flaskResponse.status !== 200) {
      return NextResponse.json({ message: "AI server error" }, { status: 501 });
    }

    const { data } = flaskResponse;
    const newMessage2 = await db.message.create({
      data: {
        content : data.text,
        sender : "AI",
        pdf: {
          connect: {
            id: pdfId,
          },
        },
      },
    });
    return NextResponse.json({ response: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
