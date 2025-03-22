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
        return NextResponse.json(result)
    }
    console.log(session);
    return NextResponse.json({
        result: " pls login first"
    })
}
// export const POST = async (req: NextRequest) => {
//     const body = await req.json();
//     const productsCollection = await dbConnect(collectionNameObj.productsCollection)
//     const result = await productsCollection.insertOne(body)
//     return NextResponse.json(result)
// }
export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const body = await req.json();
        const productsCollection = await dbConnect(collectionNameObj.productsCollection);
        const result = await productsCollection.insertOne(body);
        return NextResponse.json({
            success: true, message: "Product added successfully", data: result
        }, { status: 201 })
    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json({
            success: false, message: "Failed to add product", error: (error as Error)
        })
    }

}