import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

type RequestBody = {
    pdfId: string;
    content: string;
    sender: string;
};

export async function POST(req: Request) {
    try {
        const { pdfId, content, sender }: RequestBody = await req.json();


        if (!pdfId || !content || !sender) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const pdf = await db.pDF.findUnique({
            where: {
                id: pdfId,
            },
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

        return NextResponse.json({ message: 'Message created successfully', newMessage }, { status: 201 });
    } catch (error) {
        console.error('Error creating message:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
