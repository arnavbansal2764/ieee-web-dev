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


export async function GET(req: Request, { params }: { params: { id: string } }) {

    const pdfId = params.id;

    if (!pdfId) {
        return NextResponse.json({ message: 'Missing pdfId' }, { status: 400 });
    }

    try {
        const messages = await db.message.findMany({
            where: { pdfId },
            orderBy: { createdAt: 'asc' }, 
        });

        return NextResponse.json(messages, { status: 200 });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}