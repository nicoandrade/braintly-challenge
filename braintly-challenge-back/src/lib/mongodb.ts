import { env } from "@/env.js";
import { MongoClient } from "mongodb";

const options = {};

let mongodb: MongoClient;

if (env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
        _mongoClient?: MongoClient;
    };

    if (!globalWithMongo._mongoClient) {
        globalWithMongo._mongoClient = new MongoClient(env.MONGODB_URI, options);
    }
    mongodb = globalWithMongo._mongoClient;
} else {
    // In production mode, it's best to not use a global variable.
    mongodb = new MongoClient(env.MONGODB_URI, options);
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default mongodb;
