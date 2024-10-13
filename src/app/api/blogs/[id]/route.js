import dbConnect from "@/app/lib/dbConnect";
import Article from "@/app/models/Article";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params
        const { newCategoryId: category_id, newTitle: title, newContent: content, newAuthor: author, newImageUrl: imageUrl } = await request.json()
        await dbConnect()
        await Article.findByIdAndUpdate(id, { category_id, title, content, author, imageUrl })
        return NextResponse.json({ message: "Article updated successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while updating Article:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params
        await dbConnect()
        const article = await Article.findOne({ _id: id });
        return NextResponse.json({ article }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while fetching one Article:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}