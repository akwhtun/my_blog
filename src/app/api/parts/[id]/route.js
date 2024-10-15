import dbConnect from "@/app/lib/dbConnect";
import Part from "@/app/models/Part";
import fs from 'fs';
import path from 'path';
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params
        const form = await request.formData();
        const part = form.get('part');
        const content = form.get('content');
        const status = form.get('status');
        const file = form.get('image');
        const imageUrl = file.name;
        await dbConnect()
        const newPart = await Part.findByIdAndUpdate(id, { part, content, status, imageUrl })
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

                // Define the full path to save the file inside 'public/uploads/part'
                const filePath = path.join(publicDirectoryPath, fileToSave.name);

                // Write the file to the 'public/uploads/part' directory
                fs.writeFileSync(filePath, fileBuffer);

                console.log(`File saved to: ${filePath}`);
            }

        }
        return NextResponse.json({ message: "Part updated successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while updating Part:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params


        await dbConnect()
        const part = await Part.findOne({ _id: id });
        return NextResponse.json({ part }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while fetching one Part:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}