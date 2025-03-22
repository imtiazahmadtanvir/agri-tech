import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect'; // Import your MongoDB connection function
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