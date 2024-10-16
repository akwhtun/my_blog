import dbConnect from "@/app/lib/dbConnect";
import Article from "@/app/models/Article";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const { id } = params
        await dbConnect()
        const article = await Article.find({ _id: id });
        return NextResponse.json({ article }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while fetching one Article:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}