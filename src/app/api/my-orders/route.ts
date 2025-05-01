import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const session = await getServerSession(authOptions);
        const userEmail = session?.user?.email;


        if (!userEmail) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }


        const order = await dbConnect(collectionNameObj.orderCollection);


        const orders = await order.find({ userEmail }).toArray();


        if (orders.length === 0) {
            return NextResponse.json({ message: "No orders found" }, { status: 404 });
        }

        // Return the orders in the response
        return NextResponse.json({ success: true, orders });

    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
