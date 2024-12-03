import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware function
export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

    // Get the current URL path
    const { pathname } = request.nextUrl;

    // Routes that are for authenticated users only
    const protectedRoutes = ["/about", "/dashboard"];
    // Routes that are for admins only
    const adminRoutes = ["/admin"];

    if (!token) {
        // If no token is found and the route requires authentication
        if (protectedRoutes.includes(pathname) || adminRoutes.includes(pathname)) {
            const signInUrl = new URL("/auth/signin", request.url);
            return NextResponse.redirect(signInUrl);
        }
        // Allow access to public routes for unauthenticated users
        return NextResponse.next();
    }

    // Check for admin routes
    if (adminRoutes.includes(pathname) && !token.isAdmin) {
        // Redirect to a 403 Forbidden page if the user is not an admin
        const forbiddenUrl = new URL("/403", request.url);
        return NextResponse.redirect(forbiddenUrl);
    }

    // Allow access for authenticated users and admins
    return NextResponse.next();
}

// Specify which routes the middleware should protect
export const config = {
    matcher: ["/about", "/dashboard", "/admin"], // List all protected routes here
};
