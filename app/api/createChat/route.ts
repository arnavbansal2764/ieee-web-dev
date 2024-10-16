import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import axios from "axios";

export async function POST(req: Request) {

  const { pdfUrl, chatTitle } = await req.json();
  const { userId } = auth();



  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const flaskResponse = await axios.post("url_flask", { pdfUrl });

    if (flaskResponse.status !== 200) {
      return NextResponse.json({ message: "AI server error" }, { status: 501 });
    }

    const { data } = flaskResponse;

    const pdf = await db.pDF.create({
      data: {
        name: chatTitle,
        pdfUrl: pdfUrl,
        userId: userId,
        text: data.text,
        image_text: data.image_text,
        messages: {
          create: data.messages.map((message: any) => ({
            content: message.content,
            sender: message.sender,
          })),
        },
      },
    });


    return NextResponse.json({ pdf }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
