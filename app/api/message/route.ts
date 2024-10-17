import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import axios from "axios";

export async function POST(req: Request) {
  const { pdfId, content, sender } = await req.json();
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const pdf = await db.pDF.findUnique({
      where: { id: pdfId },
      include: {
        messages: {
          select: {
            content: true,
            role: true,
          },
        },
      },
    });
    if (!pdf) {
      return NextResponse.json({ message: "PDF not found" }, { status: 404 });
    }
    const newMessage = await db.message.create({
      data: {
        content,
        role: sender,
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

    const textDB = await db.text.findMany({ where: { pdfId: pdfId } });
    const text = [];
    for (const t of textDB) {
      text.push(t.arrayData);
    }
    const flaskResponse = await axios.post("http://127.0.0.1:5000/message", {
      text: text,
      image_text: pdf.image_text,
      messages: pdf.messages,
      userQuery: content,
    });
    console.log("Response: ", flaskResponse);
    const senderMessage = await db.message.create({
      data: {
        content,
        role: "user",
        pdf: {
          connect: {
            id: pdfId,
          },
        },
      },
    });
    const AIMessage = await db.message.create({
      data: {
        content: flaskResponse.data.message,
        role: "assistant",
        pdf: {
          connect: {
            id: pdfId,
          },
        },
      },
    });
    const temp = flaskResponse.data.metadata[0];
    console.log("Metadata: ", temp);
    if (flaskResponse.status !== 200) {
      return NextResponse.json({ message: "AI server error" }, { status: 501 });
    }

    console.log("metadata: ", flaskResponse.data.metadata[0]);

    return NextResponse.json(
      {
        message: flaskResponse.data.message,
        metadata: flaskResponse.data.metadata,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
