import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

    // Get the current URL path
    const { pathname } = request.nextUrl;

    // Routes that are for authenticated users only
    const protectedRoutes = [];

    // Routes that are for admins only
    const adminRoutes = [
        "/categories",
        "/admin",
        "/blogs/view",
        "/blogs/write/parts",
        "/blogs/edit",
        "/blogs/create",
        "/blogs/part/view",
        "/blogs/part/edit",
    ];

    // Handle unauthenticated users
    if (!token) {
        if (
            protectedRoutes.some((route) => pathname.startsWith(route)) ||
            adminRoutes.some((route) => pathname.startsWith(route))
        ) {
            const signInUrl = new URL("/auth/signin", request.url);
            return NextResponse.redirect(signInUrl);
        }
        return NextResponse.next();
    }

    // Check for admin routes
    if (
        adminRoutes.some((route) => pathname.startsWith(route)) &&
        !token.isAdmin
    ) {
        const forbiddenUrl = new URL("/403", request.url);
        return NextResponse.redirect(forbiddenUrl);
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        "/categories/:path*",   // Matches dynamic and nested paths under /categories
        "/admin",
        "/blogs/view/:path*",   // Matches dynamic and nested paths under /blogs/view
        "/blogs/edit/:path*",   // Matches dynamic and nested paths under /blogs/edit
        "/blogs/write/parts",   // Specific route
        "/blogs/create/:path*",
        "/blogs/part/:path*",
    ],
};

