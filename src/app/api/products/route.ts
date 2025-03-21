import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"


export const GET = async (req: NextResponse) => {
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
export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const productsCollection = await dbConnect(collectionNameObj.productsCollection)
    const result = await productsCollection.insertOne(body)
    return NextResponse.json(result)
}