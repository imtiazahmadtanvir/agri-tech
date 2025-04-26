import { MongoClient, ServerApiVersion, Collection } from 'mongodb';

export const collectionNameObj = {
    userCollection: 'users',
    productsCollection: "products",
    agriSupplyMarketCollection: "AgriSupply-Market",
    listingsCollection: 'listings',
    cartsCollection: "carts"
} as const;

const uri = `${process.env.MONGODB_URI}` as string;
const dbName = `${process.env.MONGODB_DBNAME}` as string;

if (!uri) {
    throw new Error("MONGODB_URI is missing in environment variables.");
}
if (!dbName) {
    throw new Error("MONGODB_DBNAME is missing in environment variables.");
}

let cachedClient: MongoClient | null = null;
let cachedDb: ReturnType<MongoClient['db']> | null = null;

type CollectionName = typeof collectionNameObj[keyof typeof collectionNameObj];

async function dbConnect(collectionName: CollectionName): Promise<Collection> {
    if (cachedClient && cachedDb) {
        return cachedDb.collection(collectionName);
    }

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    await client.connect();
    const db = client.db(dbName);
    cachedClient = client;
    cachedDb = db;

    return db.collection(collectionName);
}

export default dbConnect;
