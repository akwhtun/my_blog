import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Category, { ICategory } from "@/app/models/Category";

export async function POST(request) {
    try {
        const { name } = await request.json();
        await dbConnect();
        await Category.create({ name });
        return NextResponse.json({ message: "Category created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while creating Category:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const categories = await Category.find({});
        return NextResponse.json({ categories }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while fetching categories:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {

        const categoryId = request.nextUrl.searchParams.get('id');
        console.log("id is here " + categoryId);

        await dbConnect();
        const result = await Category.findByIdAndDelete(categoryId);
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while deleting category:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
