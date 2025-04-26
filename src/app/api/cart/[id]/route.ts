import { authOptions } from "@/lib/auth"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { Document, PullOperator } from "mongodb";
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const resolveParams = await params
    const { id } = resolveParams
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Unauthorized request" }, { status: 401 })
    }
    const cart = await dbConnect(collectionNameObj.cartsCollection)
    const isExisted = await cart.findOne({ userEmail: session?.user.email })
    if (!isExisted) {
        return NextResponse.json({ message: "Unauthorized request" }, { status: 401 })
    }
    try {
        await cart.updateOne(
            { userEmail: session.user.email },
            { $pull: { items: { productId: id } } as unknown as PullOperator<Document> }
        );
        return NextResponse.json({ message: "Deleted successful" }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }

}