import { NextRequest, NextResponse } from "next/server";

import { ObjectId } from "mongodb";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvePromise = await params;
    const { id } = resolvePromise;
    try {
        const { status } = await req.json();

        if (!["pending", "cancel", "ready", "delivered"].includes(status)) {
            return NextResponse.json({ message: "Invalid status" }, { status: 400 });
        }


        const ordersCollection = await dbConnect(collectionNameObj.orderCollection);

        const result = await ordersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Order status updated" });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
