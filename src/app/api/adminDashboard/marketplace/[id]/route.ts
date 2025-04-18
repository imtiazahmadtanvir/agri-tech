import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        const resolvedParams = await params;
        const { id } = resolvedParams
        console.log(id);
        const session = await getServerSession(authOptions)
        if (session?.user.role !== "admin") {
            return NextResponse.json({
                message: 'unauthorize access'
            }, { status: 401 })
        }
        const listingCollection = await dbConnect(collectionNameObj.listingsCollection)
        const result = await listingCollection.findOne({ _id: new ObjectId(id) })
        return NextResponse.json({ success: true, message: "fetch successfully", data: result }, { status: 200 });
    } catch (error) {
        console.error('error from product details', error)
        return NextResponse.json({ message: "Something went wrong", }, { status: 500 });
    }
};
