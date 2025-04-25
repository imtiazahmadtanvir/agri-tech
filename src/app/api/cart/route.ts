import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface CartItem {
    productId: string;
    quantity: number;
}

export const POST = async (req: NextRequest) => {
    try {
        const { productId, quantity } = await req.json()
        const session = await getServerSession(authOptions)
        console.log(session);
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const userEmail = session?.user.email
        const cartsCollection = await dbConnect(collectionNameObj.cartsCollection)
        const existingCart = await cartsCollection.findOne({ userEmail });
        if (existingCart) {
            const existingItem = existingCart.items.find((item: CartItem) => item.productId === productId)
            if (existingItem) {
                await cartsCollection.updateOne({ userEmail, "items.productId": productId }, {
                    $inc: { "items.$.quantity": quantity }
                });
            } else {
                const updatedItems = [
                    ...existingCart.items,
                    { productId, quantity }
                ];
                await cartsCollection.updateOne({ userEmail }, {
                    $set: { items: updatedItems }

                })
            }
        } else {
            await cartsCollection.insertOne({
                userEmail,
                items: [{ productId, quantity }]
            })
        }


        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Cart POST error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
export const GET = async () => {
    try {
        const session = await getServerSession(authOptions)
        console.log(session);
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const userEmail = session?.user.email
        const cartsCollection = await dbConnect(collectionNameObj.cartsCollection)
        const cart = await cartsCollection.findOne({ userEmail });
        return NextResponse.json({ cart: cart?.items || [] })

    } catch (error) {
        console.error("GET /cart error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}