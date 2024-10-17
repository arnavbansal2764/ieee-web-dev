import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import axios from "axios";

export async function POST(req: Request) {
  const { pdfUrl, name } = await req.json();
  if (!pdfUrl) {
    return NextResponse.json({ message: "NO URL" }, { status: 404 });
  }
  console.log("URL: ", pdfUrl);
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const flaskResponse = await axios.post("http://127.0.0.1:5000/initial", {
      pdfUrl,
    });

    if (flaskResponse.status !== 200) {
      return NextResponse.json({ message: "AI server error" }, { status: 501 });
    }

    const { data } = flaskResponse;

    const pdf = await db.pDF.create({
      data: {
        name: name, // Ensure chatTitle is correctly passed here
        pdfUrl: pdfUrl,
        userId: userId,
        image_text: data.image_text,
        fiveQues: data.ques,
      },
    });
    for (const t of data.text) {
      await db.text.create({
        data: {
          arrayData: t,
          pdfId: pdf.id,
        },
      });
    }
    await db.message.create({
      data: {
        content: "You are a helpful chatbot",
        role: "system",
        pdf: {
          connect: {
            id: pdf.id,
          },
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
