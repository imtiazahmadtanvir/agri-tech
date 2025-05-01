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
        const { productId, quantity, unit, price, photoUrl, productName, vendorEmail } = await req.json();
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const userEmail = session?.user.email
        const cartsCollection = await dbConnect(collectionNameObj.cartsCollection)
        const existingCart = await cartsCollection.findOne({ userEmail });
        const cartData = {
            userEmail, vendorEmail, items: [
                { productId, productName, unit, quantity, price, photoUrl }
            ]
        }

        if (existingCart) {
            const existingItem = existingCart.items.find((item: CartItem) => item.productId === productId)
            if (existingItem) {
                await cartsCollection.updateOne({ userEmail, "items.productId": productId }, {
                    $inc: { "items.$.quantity": quantity }
                });
            } else {
                const updatedItems = [
                    ...existingCart.items,
                    { productId, productName, unit, quantity, price, photoUrl }
                ];
                await cartsCollection.updateOne({ userEmail }, {
                    $set: { items: updatedItems }

                })
            }
        } else {
            await cartsCollection.insertOne(cartData)
        }



        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Cart POST error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
export const GET = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userEmail = session.user.email;
        const cartsCollection = await dbConnect(collectionNameObj.cartsCollection);
        const cart = await cartsCollection.findOne({ userEmail });
        console.log(cart);

        if (!cart) {
            return NextResponse.json(
                { message: "Cart not found", cart: null },
                { status: 404 }
            );
        }

        const items = cart.items || [];

        let totalQuantity = 0;
        let totalPrice = 0;

        for (const item of items) {
            const quantity = Number(item.quantity) || 0;
            const price = Number(item.price) || 0;

            totalQuantity += quantity;
            totalPrice += price * quantity;
        }

        return NextResponse.json(
            {
                vendorEmail: cart.vendorEmail,
                cart: cart.items,
                totalQuantity,
                totalPrice,
                status: "pending"
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("GET /cart error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
};

