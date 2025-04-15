import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { password, email } = await req.json();
        const userCollection = await dbConnect(collectionNameObj.userCollection);

        const user = await userCollection.findOne({
            email
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid or expired token." },
                { status: 404 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userCollection.updateOne(
            { _id: user._id },
            {
                $set: {
                    password: hashedPassword,
                },
                $unset: {
                    resetToken: "",
                    resetTokenExpiry: "",
                },
            }
        );

        return NextResponse.json(
            { success: true, message: "Password updated successfully!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Reset Password Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
