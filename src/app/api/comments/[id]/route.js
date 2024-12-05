import dbConnect from "@/app/lib/dbConnect";
import Comment from "@/app/models/Comment";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;

        const { comment } = await request.json();
        await dbConnect();
        await Comment.findByIdAndUpdate(id, { content: comment });

        return NextResponse.json({ message: "Comment updated successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while updating Comment:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


export async function GET(request, { params }) {

    try {
        const { id } = params;
        await dbConnect()
        const comment = await Comment.findOne({ _id: id });
        return NextResponse.json({ comment }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while fetching one Comment:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}



export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        await dbConnect();
        const result = await Comment.findByIdAndDelete(id);
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Comment not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while deleting Comment:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
