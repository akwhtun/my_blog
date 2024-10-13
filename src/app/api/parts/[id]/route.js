import dbConnect from "@/app/lib/dbConnect";
import Part from "@/app/models/Part";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params
        const { newArticleId: article_id, newPart: part, newContent: content, newImageUrl: imageUrl, newStatus: status } = await request.json()
        await dbConnect()
        await Part.findByIdAndUpdate(id, { article_id, part, content, imageUrl, status })
        return NextResponse.json({ message: "Part updated successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while updating Part:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params
        await dbConnect()
        const part = await Part.findOne({ _id: id });
        return NextResponse.json({ part }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while fetching one Part:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}