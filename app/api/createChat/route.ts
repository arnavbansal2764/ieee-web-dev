import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import axios from "axios";

export async function POST(req: Request) {
  const { pdfUrl, chatTitle } = await req.json();
  const { userId } = auth();
  console.log("/in backend : pdfUrl: ", pdfUrl, " chatTitle: ", chatTitle);
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const flaskResponse = await axios.post("http://127.0.0.1:5000/initial", { pdf_url: pdfUrl });

    if (flaskResponse.status !== 200) {
      return NextResponse.json({ message: "AI server error" }, { status: 501 });
    }

    const { text, images } = flaskResponse.data;
    

    const pdf = await db.pDF.create({
      data: {
        name: chatTitle,
        pdfUrl: pdfUrl,
        userId: userId,
        text: text,
        image_text: images,
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
