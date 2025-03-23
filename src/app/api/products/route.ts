import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import type { NextRequest } from 'next/server';
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"


export const GET = async (req: NextRequest) => {
    const session = await getServerSession(authOptions)

    if (session) {
        const email = session.user?.email
        const productsCollection = await dbConnect(collectionNameObj.productsCollection)
        const result = await productsCollection.find({ email }).toArray()
        return NextResponse.json({
            success: true, message: "get added products successfully", data: result
        }, { status: 201 })
    }
    console.log(session);
    return NextResponse.json({

    })
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const body = await req.json();
        const user = await getServerSession(authOptions)
        console.log(user);
        body.username = user?.user.name;
        body.email = user?.user.email;
        const productsCollection = await dbConnect(collectionNameObj.productsCollection);
        const result = await productsCollection.insertOne(body);
        return NextResponse.json({ success: true, message: "Fetched products successfully", data: result }, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch products", error: error }, { status: 500 });
    }

}