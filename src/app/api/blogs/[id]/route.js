import dbConnect from "@/app/lib/dbConnect";
import Article from "@/app/models/Article";
import Part from "@/app/models/Part";
import fs from 'fs';
import path from 'path';
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params
        const form = await request.formData();
        const category_id = form.get('categoryId');
        const title = form.get('title');
        const content = form.get('content');
        const author = form.get('author');
        const file = form.get('image');
        const imageUrl = file.name;
        await dbConnect()
        const newArticle = await Article.findByIdAndUpdate(id, { category_id, title, content, author, imageUrl })
        if (newArticle) {
            let fileToSave;

            form.forEach((value, key) => {
                if (value instanceof File) {
                    console.log("value of file", value);

                    fileToSave = value; // Get the file from formData
                } else {
                    console.log(`${key}: ${value}`); // Log other form fields
                }
            });
            if (fileToSave) {
                // Create a directory to save the file inside 'public/uploads/article' (if it doesn't exist)
                const publicDirectoryPath = path.join(process.cwd(), 'public/uploads/article/');
                if (!fs.existsSync(publicDirectoryPath)) {
                    fs.mkdirSync(publicDirectoryPath, { recursive: true });
                }

                // Get the file's buffer
                const fileBuffer = Buffer.from(await fileToSave.arrayBuffer());

                // Define the full path to save the file inside 'public/uploads/article'
                const filePath = path.join(publicDirectoryPath, fileToSave.name);

                // Write the file to the 'public/uploads/article' directory
                fs.writeFileSync(filePath, fileBuffer);

                console.log(`File saved to: ${filePath}`);
            }

        }
        return NextResponse.json({ message: "Article updated successfully" }, { status: 201 });
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

