import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Comment, { IComment } from "@/app/models/Comment";
import { ObjectId } from "mongodb";
export async function POST(request) {
    try {
        // const { userId, articleId, partId, comment } = await request.json();
        const form = await request.formData();

        const userId = form.get('userId');
        const blogId = form.get('blogId');
        const partId = form.get('partId');
        const comment = form.get('comment');
        await dbConnect();
        await Comment.create({ user_id: userId, article_id: blogId, part_id: partId, content: comment });
        return NextResponse.json({ message: "Comment has been submitted successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while creating Comment:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const partId = request.nextUrl.searchParams.get('id');
        await dbConnect();
        const comments = await Comment.aggregate([
            {
                $match: { part_id: new ObjectId(partId) }, // Filter comments by part_id
            },
            {
                $lookup: {
                    from: "users", // Name of the Users collection
                    localField: "user_id", // Field in the Comments collection to join on
                    foreignField: "_id", // Field in the Users collection to join on
                    as: "user", // Alias for the joined data
                },
            },
            {
                $lookup: {
                    from: "parts", // Name of the Parts collection
                    localField: "part_id", // Field in the Comments collection to join on
                    foreignField: "_id", // Field in the Parts collection to join on
                    as: "part", // Alias for the joined data
                },
            },
            {
                $unwind: "$user", // Unwind the user array to a single object
            },
            {
                $unwind: "$part", // Unwind the part array to a single object
            },
            {
                $project: {
                    content: 1, // Include comment content
                    created_date: 1, // Include comment created_date
                    "user._id": 1, // Include user ID
                    "user.name": 1, // Include user name (adjust this based on your schema)
                    "user.email": 1, // Include user email (adjust this based on your schema)
                    "user.imageUrl": 1,
                    "part._id": 1, // Include part title
                    "part.article_id": 1, // Include part title
                    "part.part": 1, // Include part title
                },
            },
        ]);


        return NextResponse.json({ comments }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while fetching comments:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

