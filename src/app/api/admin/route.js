import { NextResponse } from "next/server";
export async function POST(request) {

    const { email, password } = await request.json();

    console.log(email, password);


    if (email == "akwhtun@gmail.com" && password == "akwh@2002") {
        return NextResponse.json({ message: "Login Successful" }, { status: 201 });
    } else {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 500 });
    }


}


