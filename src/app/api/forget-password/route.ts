import { NextResponse } from "next/server";
import { collectionNameObj } from "@/lib/dbConnect";
import dbConnect from "@/lib/dbConnect";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const POST = async (req: Request) => {
    try {
        const { email } = await req.json();
        const userCollection = await dbConnect(collectionNameObj.userCollection);
        const existentUser = await userCollection.findOne({ email });

        if (!existentUser) {
            return NextResponse.json(
                { success: false, message: "Email doesn't exist" },
                { status: 404 }
            );
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const passwordRestToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        const passwordRestExpires = Date.now() + 300000; // 5 minutes
        await userCollection.updateOne(
            { email },
            {
                $set: {
                    restToken: passwordRestToken,
                    restTokenExpiry: passwordRestExpires,
                },
            }
        );

        const restUrl = `${process.env.NEXTAUTH_URL}/rest-password/${resetToken}`;
        // Send email with Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Support Team" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset Link",
            html: `
                <p>Hello,</p>
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${restUrl}" target="_blank">Reset Password</a>
                <p>This link will expire in 5 minutes.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: "Reset link sent to your email." },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error during password reset:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
};
