import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest) {
    console.log("clear");
    try {
        const body = await req.json()
        const { userEmail } = body
        if (!userEmail) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }
        const cart = await dbConnect(collectionNameObj.cartsCollection)
        const orInfo = await cart.findOne({ userEmail: userEmail })
        if (!orInfo) {
            return NextResponse.json({ error: "Missing in cart" }, { status: 400 });
        }
        const order = await dbConnect(collectionNameObj.orderCollection)
        await order.insertOne(orInfo)
        await cart.deleteOne({ userEmail })
        return NextResponse.json({ success: true, message: "Cart moved to order and deleted from cart" });

    } catch (error) {
        console.error("Error processing cart:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}