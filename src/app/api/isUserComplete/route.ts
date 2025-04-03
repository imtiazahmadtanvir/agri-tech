
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userCollection = await dbConnect(collectionNameObj.userCollection);
    const isUser = await userCollection.findOne({ email: email });
    if (!isUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });

    }
    const isProfileComplete = isUser.isProfileComplete;
    return NextResponse.json({ isProfileComplete }, { status: 200 });
}