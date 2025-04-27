import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    console.log(body);

    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const deliveryInfo = await dbConnect(collectionNameObj.deliveryInfo);
        await deliveryInfo.insertOne(body);

        return NextResponse.json({ message: "Delivery Info Saved Successfully" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
};
