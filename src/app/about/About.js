
"use client";
import React from "react";
import { useRouter } from "next/navigation";

const AboutPage = () => {
    const router = useRouter();

    const goAdmin = () => {
        router.push("/admin/login");
    };

    return (
        <div className="bg-violet-100 min-h-screen flex items-center justify-center">
            <div className="max-w-2xl w-full mx-4 p-8 md:mt-0 mt-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-4xl font-bold text-violet-700 text-center">My Story</h2>

                <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                    Welcome to my blog! <br /> A few months ago, I encountered someone
                    who captivated my heart. Her kindness, beauty, and passion inspired me
                    to share my feelings through this blog. My hope is to express my
                    experiences and emotions, to create a connection with her.
                </p>

                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                    On this blog, I hope she'll discover heartfelt stories, reflections on
                    my experiences, and insights into navigating love and relationships.
                </p>

                <p className="mt-6 text-2xl text-center italic text-gray-800">
                    I want to spend every heartbeat of my life loving her.
                </p>

                <p
                    className="mt-8 text-2xl text-center text-violet-600 font-semibold italic cursor-pointer hover:underline"
                    onClick={goAdmin}
                >
                    - Aung Kyaw Wai Htun -
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
