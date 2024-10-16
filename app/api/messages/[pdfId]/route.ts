import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET request to fetch all messages for a specific PDF
export async function GET(req: Request, { params }: { params: { pdfId: string } }) {
    try {
        const { pdfId } = params;

        // Validate that pdfId is provided
        if (!pdfId) {
            return NextResponse.json({ message: 'PDF ID is required' }, { status: 400 });
        }

        // Fetch the PDF and include its messages
        const pdfWithMessages = await db.pDF.findUnique({
            where: { id: pdfId },
            include: {
                messages: true, // Include messages in the response
            },
        });

        if (!pdfWithMessages) {
            return NextResponse.json({ message: 'PDF not found' }, { status: 404 });
        }

        // Return the messages
        return NextResponse.json({ messages: pdfWithMessages.messages }, { status: 200 });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
