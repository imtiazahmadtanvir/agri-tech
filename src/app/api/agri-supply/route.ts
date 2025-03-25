import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        // Ensure dbConnect returns the database, then get the collection
        const db = await dbConnect();
        const supplyCollection = db.collection(collectionNameObj.agriSupplyMarketCollection);

        // Fetch all supplies
        const supply = await supplyCollection.find({}).toArray();

        return NextResponse.json(
            { success: true, message: "Fetched supply successfully", data: supply },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching supply market:", error);
        const errorMessage = (error as Error).message;
        return NextResponse.json(
            { success: false, message: "Failed to fetch supply", error: errorMessage },
            { status: 500 }
        );
    }
};
