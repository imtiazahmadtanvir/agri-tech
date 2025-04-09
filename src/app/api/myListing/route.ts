import { authOptions } from "@/lib/auth"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 })
        }
        const useCollection = await dbConnect(collectionNameObj.userCollection)
        const isUser = await useCollection.findOne({ email: session?.user?.email })
        if (!isUser) {
            return NextResponse.json({ success: false, message: "user not found in the database" }, { status: 404 })
        }
        const listingsCollection = await dbConnect(collectionNameObj.listingsCollection)
        const result = await listingsCollection.find({
            userEmail: session?.user?.email
        }, {
            projection: {
                _id: 1,
                productName: 1, price: 1, photos: 1
                , listed: 1, location: 1
            }
        }).toArray()
        return NextResponse.json({ success: true, message: 'my listing fetched successfully!', data: result }, { status: 200 })
    } catch (error) {
        console.error("error fetching listing", error)
        return NextResponse.json({ message: "An error occurred while fetching the listing." }, { status: 500 })

    }
}