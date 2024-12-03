import dbConnect from "@/app/lib/dbConnect";
import Article from "@/app/models/Article";
import Part from "@/app/models/Part";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params
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
        const updateArticle = await Article.findByIdAndUpdate(id, { category_id, title, content, author, imageUrl })
        const updatedArticle = await Article.findByIdAndUpdate(id, { category_id, title, content, author, imageUrl });

        if (!updatedArticle) {
            console.error("No article found with the given ID");
            return NextResponse.json({ message: "Article not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog updated successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error occurred while updating Article:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params
        await dbConnect()
        const articleParts = await Part.find({ article_id: id });
        return NextResponse.json({ articleParts }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while fetching one Article:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

