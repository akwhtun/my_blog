import dbConnect from "@/app/lib/dbConnect";
import Article from "@/app/models/Article";
import Part from "@/app/models/Part";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId for validation and casting

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        let articleId = searchParams.get('article_id');

        // Check if articleId exists
        if (!articleId) {
            return NextResponse.json({ message: 'Article ID is required' }, { status: 400 });
        }

        // Trim any leading/trailing whitespace or newlines from the articleId
        articleId = articleId.trim();

        // Validate if the articleId is a valid ObjectId
        if (!ObjectId.isValid(articleId)) {
            return NextResponse.json({ message: 'Invalid article ID format' }, { status: 400 });
        }

        await dbConnect();

        // Convert articleId to ObjectId before querying
        const blogResult = await Article.findOne({ _id: new ObjectId(articleId) });
        const blogWithPartsResult = await Part.find({ article_id: new ObjectId(articleId) });

        // Combine results
        const result = {
            blog: blogResult,
            blogWithParts: blogWithPartsResult
        };

        if (!result.blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error occurred while fetching the Article with Parts:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
