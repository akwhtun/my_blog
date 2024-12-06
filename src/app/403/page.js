// pages/403.js
"use client"
import { useRouter } from "next/navigation";
export default function Page() {

    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Forbidden Access</h2>
            <p className="text-gray-600 mb-8 text-center">
                You do not have permission to access this page. Please contact the administrator if you believe this is a mistake.
            </p>
            <button onClick={() => router.back()}>
                <a className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Go Back to Home
                </a>
            </button>
        </div>
    );
}
