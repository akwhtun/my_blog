import dbConnect from "@/app/lib/dbConnect";
import Part from "@/app/models/Part";
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
export async function POST(request) {

    try {

        const form = await request.formData();

        const article_id = form.get('article_id');
        const part = form.get('part');
        const content = form.get('content');
        const status = form.get('status');
        const file = form.get('image');
        const imageUrl = file.name;

        console.log("hre is ", article_id, part, content, status, imageUrl);


        await dbConnect();
        const newPart = await Part.create({ article_id, part, content, status, imageUrl });

        if (newPart) {
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
                const publicDirectoryPath = path.join(process.cwd(), 'public/uploads/part/');
                if (!fs.existsSync(publicDirectoryPath)) {
                    fs.mkdirSync(publicDirectoryPath, { recursive: true });
                }

                // Get the file's buffer
                const fileBuffer = Buffer.from(await fileToSave.arrayBuffer());

                // Define the full path to save the file inside 'public/uploads/parts'
                const filePath = path.join(publicDirectoryPath, fileToSave.name);

                // Write the file to the 'public/uploads/article' directory
                fs.writeFileSync(filePath, fileBuffer);

                console.log(`File saved to: ${filePath}`);
            }

        }
        return NextResponse.json({ message: "Blog part created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while creating blog part:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// export async function GET() {
//     try {
//         await dbConnect();

//         const blog_part = await Part.find({});



//         return NextResponse.json({ blog_part }, { status: 200 });
//     } catch (error) {
//         console.error("Error occurred while fetching blog parts:", error);
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }
// }

export async function DELETE(request) {
    try {

        const blogPartId = request.nextUrl.searchParams.get('id');
        await dbConnect();
        const result = await Part.findByIdAndDelete(blogPartId);
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Blog Part not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Blog Part deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error occurred while deleting blog part:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

