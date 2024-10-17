import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
  const { userId } = auth(); // Get the user ID from Clerk

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const chats = await db.pDF.findMany({
      where: { userId: userId },
      select: {
        id: true,
        createdAt: true,
        name: true,
      },
    });

    return NextResponse.json(chats, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
