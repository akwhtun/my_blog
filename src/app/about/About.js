
"use client";
import React from "react";
import { useRouter } from "next/navigation";

const AboutPage = () => {
    // const router = useRouter();

    // const goAdmin = () => {
    //     router.push("/admin/login");
    // };

    return (
        <div className="bg-violet-100 min-h-screen flex justify-center">
            <div className="lg:w-3/4 w-screen mx-4 p-8 md:mt-0 mt-8 bg-white rounded-xl shadow-lg flex items-center justify-center flex-col">
                <h2 className="text-4xl font-bold text-violet-700 text-center">My Story</h2>

                <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                    Welcome to my blog! <br />A few months ago, I encountered someone who captivated my heart. Her kindness, beauty, and passion inspired me to share my feelings through this blog. Although I once hoped to create a connection with her, life took a different path, and we drifted apart.
                </p>

                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                    Through this blog, I still share heartfelt stories, reflections on my experiences, and insights into navigating love and relationships—not just for her, but for anyone who may find meaning in them.
                </p>

                <p className="mt-6 text-2xl text-center italic text-gray-800">
                    While she may no longer be a part of my life, the memories and lessons remain, and I carry them forward with gratitude and a heart open to what the future holds.
                </p>

                <p
                    className="mt-8 text-2xl text-center text-white-600 font-semibold italic "

                >
                    - Griffith Uchiha -
                </p>

                <p
                    className="mt-8 text-xl text-center text-violet-600 font-semibold "

                >
                    10/18/2024
                </p>
                <p
                    className="mt-8 text-xl text-center text-violet-600 font-semibold "

                >
                    Updated On:  12/21/2024
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
