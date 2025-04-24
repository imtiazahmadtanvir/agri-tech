import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
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
};

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category');
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy")
    const min = searchParams.get("minPrice")
    const max = searchParams.get("maxPrice")
    const query: QueryType = {}
    if (category) {
        query.category = category
    }
    // sort 
    let sortOption = {};

    if (!sortBy) {
        sortOption = { listed: -1 };
    } else if (sortBy === "date-old") {
        sortOption = { listed: 1 };
    } else if (sortBy === "price-high") {
        sortOption = { price: -1 };
    } else if (sortBy === "price-low") {
        sortOption = { price: 1 };
    } else {
        sortOption = {};
    }

    //  price
    if (min && max) {
        const minPrice = parseFloat(min);
        const maxPrice = parseFloat(max);
        query.price = { $gte: minPrice, $lte: maxPrice }
    } else if (min) {
        query.price = query.price = { $gte: parseFloat(min) };
    } else if (max) {
        query.price = { $lte: parseFloat(max) };
    }
    // search 
    if (search) {
        query.productName = {
            $regex: search, $options: 'i'
        }
    }
    try {
        const listingsCollection = await dbConnect(collectionNameObj.listingsCollection)
        const total = await listingsCollection.countDocuments(query)
        const result = await listingsCollection.find(query).sort(sortOption).toArray()
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