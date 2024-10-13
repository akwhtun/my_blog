import dbConnect from "@/app/lib/dbConnect";
import Category from "@/app/models/Category";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        const { name } = await request.json();
        await dbConnect();
        await Category.findByIdAndUpdate(id, { name });

        return NextResponse.json({ message: "Category updated successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while updating Category:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


export async function GET(request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        await dbConnect()
        const category = await Category.findOne({ _id: id });
        return NextResponse.json({ category }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while fetching one Category:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}