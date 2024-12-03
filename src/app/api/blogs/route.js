import dbConnect from "@/app/lib/dbConnect";
import Article from "@/app/models/Article";
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const form = await request.formData();

        const category_id = form.get('categoryId');
        const title = form.get('title');
        const content = form.get('content');
        const author = form.get('author');
        const fileData = form.get('image');

        const formData = new FormData();
        if (fileData instanceof File) {
            formData.append('file', fileData);
        } else {
            console.error('No file provided or invalid file format');
            return NextResponse.json({ message: "Invalid file format or file missing" }, { status: 400 });
        }

        formData.append('upload_preset', 'my-uploads');

        // Fetch image upload to Cloudinary
        const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dqcmn6mqw/image/upload', {
            method: 'POST',
            body: formData,
        });

        // Check for fetch failure or invalid response
        if (!cloudinaryResponse.ok) {
            console.error("Cloudinary upload failed:", cloudinaryResponse.statusText);
            return NextResponse.json({ message: "Cloudinary Server Error" }, { status: 500 });
        }

        const data = await cloudinaryResponse.json();
        const imageUrl = data.secure_url;

        if (!imageUrl) {
            return NextResponse.json({ message: "Cloudinary Server Error: No URL returned" }, { status: 500 });
        }

        // Connect to database and create article
        await dbConnect();
        await Article.create({ category_id, title, content, author, imageUrl });

        return NextResponse.json({ message: "Blog created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error occurred while creating blog:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}



export async function GET() {
    try {
        await dbConnect();
        const blogs = await Article.find({}).sort({ created_date: -1 });
        return NextResponse.json({ blogs }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while fetching blogs:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const articleId = request.nextUrl.searchParams.get('id');
        await dbConnect();

        // Ensure you're querying by _id, not articleId
        const result = await Article.findByIdAndDelete(articleId);

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while deleting blog:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}



