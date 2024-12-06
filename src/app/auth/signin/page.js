"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/"; // Default to home page if no callback URL is provided

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <button
                className="w-24 text-lg my-2 text-white bg-gray-800"
                onClick={() => router.back()}
            >
                Back
            </button>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Sign In</h1>
            <p className="text-gray-600 mb-8">Sign in to access next.</p>
            <button
                onClick={() => signIn("google", { callbackUrl })}
                className="lg:mt-1 mt-3 flex items-center px-4 py-2 border rounded-md shadow-sm text-lg font-medium bg-violet-600 text-white"
            >
                <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google logo"
                    className="w-5 h-5 mr-2"
                />
                Sign in with Google
            </button>
        </div>
    );
}
