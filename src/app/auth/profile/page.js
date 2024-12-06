"use client";

import { useSession, signOut } from "next-auth/react";
import Navbar from "../../components/Navbar";
export default function UserProfile() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
            </div>
        );
    }
    const { user } = session;

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-md rounded-lg p-6 w-96">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h1>
                    <div className="flex items-center mb-4">
                        <img
                            src={user.image || "/default-avatar.png"}
                            alt="User Avatar"
                            className="w-16 h-16 rounded-full mr-4"
                        />
                        <div>
                            <p className="text-lg font-medium text-gray-800">
                                {user.name || "Anonymous"}
                            </p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={() => signOut()}
                            className="w-full px-4 py-2 text-white bg-violet-500 hover:bg-violet-600 rounded-md"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
