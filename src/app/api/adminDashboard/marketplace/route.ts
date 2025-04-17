import { authOptions } from "@/lib/auth"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions)
        if (session?.user.role !== "admin") {
            return NextResponse.json({
                message: 'unauthorize access'
            }, { status: 401 })
        }

        const listingsCollection = await dbConnect(collectionNameObj.listingsCollection)
        const result = await listingsCollection.find({ verifyStatus: false }, {
            projection: {
                productName: 1,
                category: 1,
                price: 1,
                location: 1,
                listed: 1,
                verifyStatus: 1,
                phoneNumber: 1,
                userName: 1,
                photos: 1
            }
        }).toArray()
        return NextResponse.json({ success: true, message: "fetch successful", data: result }, { status: 200 })
    } catch (error) {
        console.log("error in dashboard get marketplace route", error);
        return NextResponse.json({
            message: "internal server error"
        }, { status: 500 })

    }
}