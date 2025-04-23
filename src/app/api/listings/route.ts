import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { SortDirection } from "mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
type QueryType = {
    price?: {
        $gte?: number;
        $lte?: number;
    };
    category?: string;

    productName?: {
        $regex: string;
        $options: string;
    };
    location?: {
        $regex: string;
        $options: string;
    };
};

export const GET = async (req: NextRequest) => {
    try {
        const listingsCollection = await dbConnect(collectionNameObj.listingsCollection)
        const total = await listingsCollection.countDocuments()
        const result = await listingsCollection.find().toArray()
        console.log(result);
        return NextResponse.json({ success: true, message: 'Listing fetched successfully!', data: result, total }, { status: 200 })
    } catch (error) {
        console.error("error fetching listing", error)
        return NextResponse.json({ message: "An error occurred while fetching the listing." }, { status: 500 })
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const user = await getServerSession(authOptions)
        if (!user) {
            return NextResponse.json({ message: "Unauthorize:Please login" }, { status: 401 })
        }
        const useCollection = await dbConnect(collectionNameObj.userCollection);
        const isSignIn = await useCollection.findOne({ email: user?.user.email });
        if (isSignIn) {
            body.userName = user?.user.name;
            body.userEmail = user?.user.email;
            body.userImage = user?.user.image;
            body.listed = new Date().toISOString();
            body.verifyStatus = false
            const listingsCollection = await dbConnect(collectionNameObj.listingsCollection)
            const result = await listingsCollection.insertOne(body)
            return NextResponse.json({ success: true, message: 'Listing posted successfully!', data: result }, { status: 201 })
        }
        return NextResponse.json({ message: 'User not found in the database' }, { status: 404 })
    } catch (error) {
        console.error("error posting listing", error)
        return NextResponse.json({ message: "An error occurred while posting the listing." }, { status: 500 })

    }


}