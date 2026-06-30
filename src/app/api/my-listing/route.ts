import { authOptions } from "@/lib/auth"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions)
        if (session?.user.role !== 'farmer') {
            return NextResponse.json({ message: "Unauthorize" }, { status: 400 })
        }
        const listingsCollection = await dbConnect(collectionNameObj.listingsCollection)
        const data = await listingsCollection.find({ userEmail: session.user.email }).toArray()
        return NextResponse.json({ message: " list successfully", data: data }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 400 })
    }


}