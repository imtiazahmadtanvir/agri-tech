import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const user = await getServerSession(authOptions);
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userCollection = await dbConnect(collectionNameObj.userCollection);
    const isUser = await userCollection.findOne({ email: user?.user.email });
    if (!isUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });

    }
    const isProfileComplete = isUser.isProfileComplete;
    return NextResponse.json({ isProfileComplete }, { status: 200 });
}