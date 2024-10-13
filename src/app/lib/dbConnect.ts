import mongoose from "mongoose";
export default async function dbConnect() {
    const connection: { isConnected?: number } = {}

    try {
        if (connection.isConnected) {
            return;
        }

        const db = await mongoose.connect(process.env.MONGODB_URI!);

        connection.isConnected = db.connections[0].readyState;
        console.log("Connected Successfully");

    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}
