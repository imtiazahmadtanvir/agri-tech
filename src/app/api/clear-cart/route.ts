import { ObjectId } from 'mongodb';
import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface CartItem {
    productId: string;
    quantity: number;
    price: number | string;
}

export async function POST(req: NextRequest) {
    try {
        const body: CartItem[] = await req.json();
        const session = await getServerSession(authOptions);
        const userEmail = session?.user?.email;

        if (!userEmail || !Array.isArray(body) || body.length === 0) {
            return NextResponse.json(
                { error: "Missing userEmail or items" },
                { status: 400 }
            );
        }

        const cartCollection = await dbConnect(collectionNameObj.cartsCollection);
        const productCollection = await dbConnect(collectionNameObj.listingsCollection);
        const orderCollection = await dbConnect(collectionNameObj.orderCollection);

        const cart = await cartCollection.findOne<{ items: CartItem[] }>({ userEmail });

        if (!cart) {
            return NextResponse.json(
                { error: "No cart found for this user" },
                { status: 404 }
            );
        }

        // Update each product's stock individually
        for (const item of cart.items) {
            try {
                // First get the current product to check stock type
                const product = await productCollection.findOne({
                    _id: new ObjectId(item.productId)
                });

                if (!product) {
                    console.warn(`Product not found: ${item.productId}`);
                    continue;
                }

                // Handle both string and number stock values
                const currentStock = typeof product.stock === 'string'
                    ? parseFloat(product.stock)
                    : product.stock;

                const newStock = currentStock - item.quantity;

                await productCollection.updateOne(
                    { _id: new ObjectId(item.productId) },
                    { $set: { stock: newStock } }
                );
            } catch (error) {
                console.error(`Error updating product ${item.productId}:`, error);
                // Continue with other items even if one fails
            }
        }

        const totalPrice = body.reduce((total: number, item: CartItem) => {
            const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
            return total + price * item.quantity;
        }, 100);

        await orderCollection.insertOne({
            userEmail,
            items: body.map(item => ({
                ...item,
                price: typeof item.price === 'string' ? parseFloat(item.price) : item.price
            })),
            totalPrice,
            orderDate: new Date()
        });

        await cartCollection.deleteOne({ userEmail });

        return NextResponse.json({
            success: true,
            message: `${body.length} items moved to order and cart cleared successfully.`,
            orderSummary: {
                totalItems: body.length,
                totalPrice,
            },
        });
    } catch (error) {
        console.error("Error processing cart/order:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}