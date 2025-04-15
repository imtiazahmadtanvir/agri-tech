import { NextResponse } from "next/server";
import { collectionNameObj } from "@/lib/dbConnect";
import dbConnect from "@/lib/dbConnect";
import crypto from 'crypto'
export const POST = async (req: Request) => {
    try {
        const { email } = await req.json();
        console.log(email);

        const userCollection = await dbConnect(collectionNameObj.userCollection);
        const existentUser = await userCollection.findOne({ email });

        if (!existentUser) {
            return NextResponse.json(
                { success: false, message: "Email doesn't exist" },
                { status: 404 }
            );
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        const passwordRestToken = crypto.createHash("sha256").update(resetToken).digest('hex');
        const passwordRestExpires = Date.now() + 300000;
        existentUser.restToken = passwordRestToken;
        existentUser.restTokenExpiry = passwordRestExpires;
        const restUrl = `${process.env.NEXTAUTH_URL}/rest-password/${resetToken}`
        console.log(restUrl);

        return NextResponse.json(
            { success: true, message: "User does not exist. You can register." },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error checking user:", error);
        return NextResponse.json(
            { success: false, message: "Error during registration. Please try again later." },
            { status: 500 }
        );
    }
};
