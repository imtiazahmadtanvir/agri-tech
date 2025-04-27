import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { data } = await req.json();
    console.log(data);

    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const deliveryInfo = await dbConnect(collectionNameObj.deliveryInfo);
        data.userEmail = session.user.email
        await deliveryInfo.insertOne(data);

        return NextResponse.json({ message: "Delivery Info Saved Successfully" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
};
export const GET = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const deliveryInfo = await dbConnect(collectionNameObj.deliveryInfo);
        const data = await deliveryInfo.findOne({ userEmail: session.user.email })

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
};