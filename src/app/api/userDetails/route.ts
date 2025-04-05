import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user.email) {
            return NextResponse.json({ message: "Unauthorize:Please login" }, { status: 401 });
        }
        const userCollection = await dbConnect(collectionNameObj.userCollection)
        const user = await userCollection.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ message: "User not found in the database" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: 'User details fetched successfully!', data: user }, { status: 200 });

    } catch (error) {
        console.error("error fetching user details", error)
        return NextResponse.json({ message: "An error occurred while fetching the user details." }, { status: 500 })

    }
}