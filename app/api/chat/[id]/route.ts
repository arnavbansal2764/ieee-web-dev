import { NextResponse } from 'next/server';
import { auth, getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { userId } = auth(); // Use Clerk to get the current user's ID

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const chat = await db.pDF.delete({
            where: {
                id: String(id),
                userId: userId, 
            },
        });
        return NextResponse.json(chat);
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete chat." }, { status: 500 });
    }
}
