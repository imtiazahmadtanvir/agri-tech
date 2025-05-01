import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Define item type
interface CartItem {
    productId: string;
    productName?: string;
    unit: string;
    quantity: number;
    price: number | string;
    photoUrl: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const session = await getServerSession(authOptions);
        const userEmail = session?.user?.email;

        if (!userEmail || !Array.isArray(body.items) || body.items.length === 0) {
            return NextResponse.json(
                { error: "Missing userEmail or items" },
                { status: 400 }
            );
        }

        // Connect to collections
        const cartCollection = await dbConnect(collectionNameObj.cartsCollection);
        const productCollection = await dbConnect(collectionNameObj.listingsCollection);
        const orderCollection = await dbConnect(collectionNameObj.orderCollection);

        // Get user's cart
        const cart = await cartCollection.findOne<{ items: CartItem[] }>({ userEmail });

        if (!cart) {
            return NextResponse.json(
                { error: "No cart found for this user" },
                { status: 404 }
            );
        }

        // Safely cast items with proper typing
        const items = body.items as CartItem[];

        // Update stock for each product
        for (const item of cart.items) {
            try {
                const product = await productCollection.findOne({ _id: new ObjectId(item.productId) });

                if (!product) {
                    console.warn(`Product not found: ${item.productId}`);
                    continue;
                }

                const currentStock = typeof product.stock === "string"
                    ? parseFloat(product.stock)
                    : product.stock;

                const newStock = currentStock - item.quantity;

                await productCollection.updateOne(
                    { _id: new ObjectId(item.productId) },
                    { $set: { stock: newStock } }
                );
            } catch (error) {
                console.error(`Error updating product ${item.productId}:`, error);
            }
        }

        // Calculate total price (including fixed delivery fee of 100)
        const totalPrice = items.reduce((total: number, item: CartItem) => {
            const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
            return total + price * item.quantity;
        }, 100);

        // Save the order
        await orderCollection.insertOne({
            vendorEmail: body.vendorEmail || null,
            userEmail,
            items: items.map((item: CartItem) => ({
                ...item,
                price: typeof item.price === "string" ? parseFloat(item.price) : item.price,
            })),
            totalPrice,
            orderDate: new Date(),
        });

        // Delete the cart after order is placed
        await cartCollection.deleteOne({ userEmail });

        return NextResponse.json({
            success: true,
            message: `${items.length} items moved to order and cart cleared successfully.`,
            orderSummary: {
                totalItems: items.length,
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
