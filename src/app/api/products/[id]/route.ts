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

        console.log(result);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}
