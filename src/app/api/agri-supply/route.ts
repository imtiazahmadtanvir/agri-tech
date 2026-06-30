import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    try {
        const supplyCollection = await dbConnect(collectionNameObj.agriSupplyMarketCollection)
        const supply = await supplyCollection.find({}).toArray();
        return NextResponse.json({ success: true, message: "Fetched supply successfully", data: supply }, { status: 200 })
    } catch (error) {
        console.log("error from supply market", error);
        return NextResponse.json({ success: true, message: 'fail to fetched supply' }, { status: 500 })

    }
}
export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const supplyCollection = await dbConnect(collectionNameObj.agriSupplyMarketCollection);
        const result = await supplyCollection.insertOne(body);
        return NextResponse.json({
            success: true, message: "supply Item add successfully",
            data: result
        }, { status: 201 })
    } catch (error) {
        console.error("Error adding supply item:", error);
        return NextResponse.json({ success: false, message: 'failed to add supply item', error: (error as Error).message }, { status: 500 })
    }
}