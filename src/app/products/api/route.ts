import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect'; // Import your MongoDB connection function

// Define the GET API
export const GET = async () => {
    try {
        // Step 1: Connect to the MongoDB database and access the products collection
        const productsCollection = await dbConnect('products'); // Access the 'products' collection

        // Step 2: Fetch all products from the database
        const products = await productsCollection.find({}).toArray();

        // Step 3: Return the products as a JSON response
        return NextResponse.json(
            { message: "Products fetched successfully", products },
            { status: 200 }
        );

    } catch (error) {
        // Handle errors gracefully
        console.error("Error processing GET request:", error);

        return NextResponse.json(
            { error: "An internal server error occurred" },
            { status: 500 }
        );
    }
};