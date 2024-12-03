import dbConnect from "@/app/lib/dbConnect";
import Part from "@/app/models/Part";
import { NextResponse } from "next/server";
export async function POST(request) {

    try {

        const form = await request.formData();

        const article_id = form.get('article_id');
        const part = form.get('part');
        const content = form.get('content');
        const status = form.get('status');
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

        await dbConnect();
        await Part.create({ article_id, part, content, status, imageUrl });

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

