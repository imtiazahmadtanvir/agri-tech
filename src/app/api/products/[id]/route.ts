import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
interface ProductUpdate {
    productName?: string;
    price?: number | string;
    stock?: number | string;
    unit?: string;
    category?: string;
    description?: string;
}
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const reslovePrams = await params;
        const { id } = reslovePrams;
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }
        const body: ProductUpdate = await req.json();

        const collection = await dbConnect(collectionNameObj.listingsCollection);

        const updateFields: Partial<ProductUpdate> = {};
        if (body.productName !== undefined) updateFields.productName = body.productName;
        if (body.price !== undefined) updateFields.price = Number(body.price);
        if (body.stock !== undefined) updateFields.stock = Number(body.stock);
        if (body.unit !== undefined) updateFields.unit = body.unit;
        if (body.category !== undefined) updateFields.category = body.category;
        if (body.description !== undefined) updateFields.description = body.description;

        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updateFields },
            { returnDocument: "after" }
        );
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const reslovePrams = await params;
        const { id } = reslovePrams;
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }
        const collection = await dbConnect(collectionNameObj.listingsCollection);
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }

}