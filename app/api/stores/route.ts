
import {NextResponse} from 'next/server';
import { auth } from "@clerk/nextjs/server";
import { prismadb } from "@/lib/prismadb";

export async function POST(
    req: Request,
) {
    try {
        const { userId} = auth();
        const body = await req.json();
        const { name } = body;

        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401});
        }


        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }




    } catch (error) {
        console.log('[STORES_POST]', { status: 500});

    }
}