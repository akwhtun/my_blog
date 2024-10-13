import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User"; // Ensure this model exists
import { NextResponse } from "next/server";

export async function POST(request) {

    try {
        const { name, email, imageUrl, isAdmin } = await request.json();
        await dbConnect();

        let user = await User.create({ name, email, imageUrl, isAdmin });

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while creating User:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const users = await User.find({});
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while fetching users:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { userId } = await request.json();
        await dbConnect();

        const result = await User.deleteOne({ userId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while deleting user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


