import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import type { NextRequest } from 'next/server';
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth";
export const GET = async (req: NextRequest) => {
    try {
        const productsCollection = await dbConnect(collectionNameObj.productsCollection);

        // Get query parameters
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const sortBy = searchParams.get("sortBy");
        const sortOrder = searchParams.get("sortOrder") || "asc";

        // Build the query
        const query: { category?: string } = {};
        if (category) {
            query.category = category;
        }

        // Build sort options
        const sortOptions: { [key: string]: 1 | -1 } = {};
        if (sortBy) {
            const validSortFields = ["price", "listed", "productName"];
            if (validSortFields.includes(sortBy)) {
                sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
            } else {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Invalid sortBy field. Use one of: ${validSortFields.join(", ")}`,
                    },
                    { status: 400 }
                );
            }
        }
        const result = await productsCollection
            .find(query)
            .sort(sortOptions)
            .toArray();

        return NextResponse.json(
            { success: true, message: "Fetched products successfully", data: result },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch products",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const body = await req.json();
        const user = await getServerSession(authOptions)
        body.username = user?.user.name;
        body.email = user?.user.email;
        body.listed = new Date().toISOString()
        const productsCollection = await dbConnect(collectionNameObj.productsCollection);
        const result = await productsCollection.insertOne(body);
        return NextResponse.json({
            success: true, message: "Product added successfully", data: result
        }, { status: 201 })
    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json({
            success: false, message: "Failed to add product", error: (error as Error)
        }, { status: 500 })
    }

}