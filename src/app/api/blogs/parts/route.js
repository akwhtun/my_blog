import dbConnect from "@/app/lib/dbConnect";
import Article from "@/app/models/Article";
import Part from "@/app/models/Part";
import Comment from "@/app/models/Comment";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId for validation and casting

// Force the route to be dynamic
export const dynamic = 'force-dynamic';

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

        const blogWithPartsResult = await Part.aggregate([
            {
                $match: { article_id: new ObjectId(articleId) }, // Filter parts by article_id
            },
            {
                $lookup: {
                    from: "comments", // Name of the Comments collection
                    localField: "_id", // Field in the Parts collection to join on
                    foreignField: "part_id", // Field in the Comments collection to join on
                    as: "comments", // Name of the resulting array
                },
            },
            {
                $addFields: {
                    commentCount: { $size: "$comments" }, // Add a field to calculate the number of comments
                },
            },
            {
                $project: {
                    comments: 0, // Exclude the comments array if you only need the count (optional)
                },
            },
        ]);
        const result = {
            blog: blogResult,
            blogWithParts: blogWithPartsResult,
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
