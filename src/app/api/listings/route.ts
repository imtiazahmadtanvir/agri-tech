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
        const { searchParams } = new URL(req.url)
        console.log(searchParams);
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get("maxPrice");
        const category = searchParams.get("categories");
        const search = searchParams.get("search");
        const sortBy = searchParams.get("sortBy");
        const location = searchParams.get("location");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const query: QueryType = {};

        if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
        if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
        if (category) query.category = category;
        if (search) {
            query.productName = { $regex: search, $options: "i" }
        }
        if (location && location !== "all location") {
            query.location = { $regex: location, $options: "i" }
        }
        let sort: [string, SortDirection][] = [];

        if (sortBy === "") sort = [["listed", -1]];
        else if (sortBy === "date-old") sort = [["listed", 1]];
        else if (sortBy === "price-high") sort = [["price", -1]];
        else if (sortBy === "price-low") sort = [["price", 1]];
        console.log("list", query);
        const listingsCollection = await dbConnect(collectionNameObj.listingsCollection)
        const total = await listingsCollection.countDocuments(query)
        console.log("query", query);
        const result = await listingsCollection.find(query).sort(sort).skip((page - 1) * limit).limit(limit).toArray()
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