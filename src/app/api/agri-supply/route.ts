import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

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