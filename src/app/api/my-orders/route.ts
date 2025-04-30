import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Get the user session
        const session = await getServerSession(authOptions);
        const userEmail = session?.user?.email;

        // Check if user is logged in
        if (!userEmail) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        // Connect to the order collection
        const order = await dbConnect(collectionNameObj.orderCollection);

        // Fetch the orders for the logged-in user
        const orders = await order.find({ userEmail }).toArray();

        // If no orders are found, return a message indicating that
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
