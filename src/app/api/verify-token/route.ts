import crypto from "crypto";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { NextResponse } from "next/server";

export const POST = async (res: Response) => {
    const { token } = await res.json()
    const userCollection = await dbConnect(collectionNameObj.userCollection)
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await userCollection.findOne({
        resetToken: hashedToken,
        resetTokenExpiry: { $gt: new Date().toISOString() }
    }, {
        projection: {
            _id: 0,
            email: 1
        }
    });
    if (!user) {
        return NextResponse.json(
            { success: false, message: "Invalid token or expired", },
            { status: 404 }
        );
    }
    return NextResponse.json(
        { success: true, message: "got the token", data: user, },
        { status: 200 }
    );
}