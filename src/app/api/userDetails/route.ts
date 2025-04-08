import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
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
export const PUT = async (req: NextRequest) => {
    try {
        const data = await req.json();
        console.log(data);
        const session = await getServerSession(authOptions);
        if (!session?.user.email) {
            return NextResponse.json({ message: "Unauthorize:Please login" }, { status: 401 });
        }
        const userCollection = await dbConnect(collectionNameObj.userCollection)
        const user = await userCollection.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ message: "User not found in the database" }, { status: 404 });
        }
        const updatedUser = await userCollection.updateOne({ email: session.user.email }, {
            $set: {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                village: data.village,
                district: data.district,
                landSize: parseFloat(data.landSize,),
                categories: data.categories,

            }
        }, { upsert: true });
        if (!updatedUser) {
            return NextResponse.json({ message: "Failed to update user details" }, { status: 500 });
        }
        return NextResponse.json({ success: true, message: 'User details updated successfully!' }, { status: 200 });
    } catch (error) {
        console.error("error updating user details", error)
        return NextResponse.json({ message: "An error occurred while updating the user details." }, { status: 500 })

    }
}