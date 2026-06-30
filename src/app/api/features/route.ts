import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const productCollection = await dbConnect(collectionNameObj.listingsCollection);
        const products = await productCollection.find({}).limit(4).toArray();
        return NextResponse.json(products, { status: 200 });

    } catch (error) {
        console.log(error, "Error in GET request");
        return NextResponse.json("Internal Server Error", { status: 500 });

    }
}