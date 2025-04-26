import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
    const { quantity, productId } = await req.json()
    console.log(quantity);
    const session = await getServerSession(authOptions)
    if (!session?.user.email || !productId || typeof quantity !== 'number') {
        return NextResponse.json({ message: "Invalid request" }, { status: 400 })
    }
    const cart = await dbConnect(collectionNameObj.cartsCollection)
    try {
        await cart.updateOne({
            userEmail: session.user.email, "items.productId": productId
        }, { $set: { "items.quantity": quantity } })
        return NextResponse.json({ message: "Quantity updated successfully" }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })

    }
}