import { NextResponse } from 'next/server';
import dbConnect, { collectionNameObj } from '@/lib/dbConnect'; // Import your MongoDB connection function
import { ObjectId } from 'mongodb';

// Define the GET API
export const GET = async () => {
    try {
        // Step 1: Connect to the MongoDB database and access the products collection
        const productsCollection = await dbConnect(collectionNameObj.productsCollection); // Access the 'products' collection

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
// Define the POST API
export const POST = async (request: Request) => {
    try {
        // Step 1: Parse the incoming JSON request body
        const body = await request.json();

        // Step 2: Validate the required fields in the request body
        const {
            productName,
            category,
            quantity,
            unit,
            pricePerUnit,
            description,
            images,
            farmerName,
            farmLocation,
            contactInfo,
            deliveryOptions,
            paymentMethods,
            source,
            farmingPractices,
        } = body;

        if (!productName || !category || !quantity || !unit || !pricePerUnit || !description || !farmerName || !farmLocation) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Step 3: Connect to the MongoDB database and access the products collection
        const productsCollection = await dbConnect('products'); // Access the 'products' collection

        // Step 4: Insert the product data into the database
        const newProduct = {
            productName,
            category,
            quantity,
            unit,
            pricePerUnit,
            description,
            images,
            farmerName,
            farmLocation,
            contactInfo,
            deliveryOptions,
            paymentMethods,
            source,
            farmingPractices,
            listingDate: new Date(),
            status: "active", // Default status
        };

        const result = await productsCollection.insertOne(newProduct);

        // Step 5: Return a success response with the inserted product ID
        return NextResponse.json({ message: "Product listed successfully", productId: result.insertedId }, { status: 201 });

    } catch (error) {
        // Handle errors gracefully
        console.error("Error processing POST request:", error);

        return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 });
    }
};

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
            { status: 500 });
    }
};