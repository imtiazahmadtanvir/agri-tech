import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const resolvedParams = await params;
        const { id } = resolvedParams
        const listingCollection = await dbConnect(collectionNameObj.listingsCollection);
        const oneList = await listingCollection.findOne({ _id: new ObjectId(id) })
        return NextResponse.json(oneList, { status: 200 })


    } catch (error) {
        console.error("error fetching listing", error)
        return NextResponse.json({ message: "An error occurred while fetching the listing." }, { status: 500 })

    }
}