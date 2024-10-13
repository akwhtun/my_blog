import dbConnect from "@/app/lib/dbConnect";
import Part from "@/app/models/Part";
import { NextResponse } from "next/server";

export async function POST(request) {

    try {
        const { article_id, part, content, imageUrl, status } = await request.json();
        await dbConnect();
        part = await Part.create({ article_id, part, content, imageUrl, status });

        return NextResponse.json({ message: "Blog part created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while creating blog part:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET({ params }) {
    try {
        const { id } = params;
        await dbConnect();
        if (id) {
            const blog_part = await Part.find('article related blog');
        }
        const blog_part = await Part.find({});

        return NextResponse.json({ blog_part }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while fetching blog parts:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { partId } = await request.json();
        await dbConnect();

        const result = await Part.deleteOne({ partId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Blog part not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog part deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while deleting blog part:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


