import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();


        const session = await getServerSession(authOptions);
        const userEmail = session?.user?.email;

        if (!userEmail || !Array.isArray(body) || body.length === 0) {
            return NextResponse.json({ error: "Missing userEmail or items" }, { status: 400 });
        }


        const cart = await dbConnect(collectionNameObj.cartsCollection);


        const cartData = await cart.findOne({ userEmail });

        if (!cartData) {
            return NextResponse.json({ error: "No cart found for this user" }, { status: 404 });
        }


        const order = await dbConnect(collectionNameObj.orderCollection);


        const orderData = {
            userEmail,
            body,
            totalPrice: body.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0),
            orderDate: new Date(),
        };

        await order.insertOne(orderData);

        await cart.deleteOne({ userEmail });

        const numItems = body.length;


        return NextResponse.json({
            success: true,
            message: `${numItems} items moved to order and cart cleared successfully`,
        });

    } catch (error) {
        console.error("Error processing cart:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
