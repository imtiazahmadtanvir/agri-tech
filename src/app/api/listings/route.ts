import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest,)

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const user = await getServerSession(authOptions)
        if (!user) {
            return NextResponse.json({ message: "Unauthorize:Please login" }, { status: 401 })
        }
        const useCollection = await dbConnect(collectionNameObj.userCollection);
        const isSignIn = await useCollection.findOne({ email: user?.user.email });
        if (isSignIn) {
            body.userName = user?.user.name;
            body.userEmail = user?.user.email;
            body.userImage = user?.user.image;
            const listingsCollection = await dbConnect(collectionNameObj.listingsCollection)
            const result = await listingsCollection.insertOne(body)
            return NextResponse.json({ success: true, message: 'Listing posted successfully!', data: result }, { status: 200 })
        }
        return NextResponse.json({ message: 'User not found in the database' }, { status: 404 })
    } catch (error) {
        console.error("error posting listing", error)
        return NextResponse.json({ message: "An error occurred while posting the listing." }, { status: 500 })

    }


    return

}