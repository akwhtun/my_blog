import dbConnect from "@/app/lib/dbConnect";
import Part from "@/app/models/Part";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params
        const form = await request.formData();
        const part = form.get('part');
        const content = form.get('content');
        const status = form.get('status');
        const fileData = form.get('image');

        let isContainNewImage = false;
        let imageUrl = fileData;

        const formData = new FormData();
        if (fileData instanceof File) {
            formData.append('file', fileData);
            isContainNewImage = true;
        } else {
            isContainNewImage = false;
            // console.error('No file provided or invalid file format');
            // return NextResponse.json({ message: "Invalid file format or file missing" }, { status: 400 });
        }

        if (isContainNewImage) {
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
            imageUrl = data.secure_url;

            if (!imageUrl) {
                return NextResponse.json({ message: "Cloudinary Server Error: No URL returned" }, { status: 500 });
            }
        }

        await dbConnect()
        const newPart = await Part.findByIdAndUpdate(id, { part, content, status, imageUrl })

        if (!newPart) {
            console.error("No part found with the given ID");
            return NextResponse.json({ message: "Blog Part not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog Part updated successfully" }, { status: 201 });


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