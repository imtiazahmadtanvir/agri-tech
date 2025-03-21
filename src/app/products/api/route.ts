import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect'; // Import your MongoDB connection function

// Define the DELETE API
export const DELETE = async (request: Request) => {
    try {
        // Step 1: Extract the product ID from the request URL
        const url = new URL(request.url);
        const productId = url.searchParams.get('id'); // Get the product ID from query parameters

        if (!productId) {
            return NextResponse.json(
                { error: "Product ID is required" },
                { status: 400 }
            );
        }

        // Step 2: Connect to the MongoDB database and access the products collection
        const productsCollection = await dbConnect('products'); // Access the 'products' collection

        // Step 3: Delete the product with the specified ID
        const result = await productsCollection.deleteOne({ _id: new ObjectId(productId) });

        // Step 4: Check if the product was successfully deleted
        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        // Step 5: Return a success response
        return NextResponse.json(
            { message: "Product deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        // Handle errors gracefully
        console.error("Error processing DELETE request:", error);

        return NextResponse.json(
            { error: "An internal server error occurred" },
            { status: 500 }
        );
    }
};