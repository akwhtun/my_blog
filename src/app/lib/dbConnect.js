// import mongoose from "mongoose";

// const connection: { isConnected?: number } = {}

// async function dbConnect() {
//     try {
//         if (connection.isConnected) {
//             return;
//         }

//         const db = await mongoose.connect(process.env.MONGODB_URI!)

//         connection.isConnected = db.connections[0].readyState;
//     } catch {
//         console.log("fuck monogdb");

//     }
// }

import mongoose from "mongoose";

const dbConnect = async () => {
    if (mongoose.connections[0].readyState) {
        return true;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB!");
        return true; // Indicate a successful connection
    } catch (error) {
        console.error("MongoDB connection error:", error);
        return false; // Indicate a failed connection
    }
}

export default dbConnect;


