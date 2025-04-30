import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json()
        const { userId } = body
        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }
        const cart = await dbConnect(collectionNameObj.cartsCollection)

    } catch (error) {

    }
}