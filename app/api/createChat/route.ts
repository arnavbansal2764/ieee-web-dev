import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'; 
import { db } from '@/lib/db';

export async function POST(req: Request) {
    const { pdfUrl, chatTitle } = await req.json();
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {

        const newPdf = await db.pDF.create({
            data: {
                pdfUrl: pdfUrl,
                userId: userId, 
                name : chatTitle
            },
        });

        return NextResponse.json(newPdf, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
