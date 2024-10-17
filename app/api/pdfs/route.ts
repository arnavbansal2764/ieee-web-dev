// app/api/pdfs/route.ts
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const { userId } = auth();  // Extract userId from Clerk session

    if (!userId) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {
       
        const pdfs = await db.pDF.findMany({ where: { userId: userId } });

        return NextResponse.json(pdfs, { status: 200 });
    } catch (error) {
        console.error('Error fetching PDFs:', error);
        return NextResponse.json({ error: 'Failed to fetch PDFs' }, { status: 500 });
    }
}
