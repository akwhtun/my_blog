import dbConnect from "@/app/lib/dbConnect";
import Article from "@/app/models/Article"; // Ensure this model exists
import { NextResponse } from "next/server";

export async function POST(request) {

    try {
        const { category_id, title, content, author, imageUrl } = await request.json();
        await dbConnect();
        user = await Article.create({ category_id, title, content, author, imageUrl });

        return NextResponse.json({ message: "Blog created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while creating blog:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const blogs = await Article.find({});
        return NextResponse.json({ blogs }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while fetching blogs:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { articleId } = await request.json();
        await dbConnect();

        const result = await Article.deleteOne({ articleId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while deleting blog:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


