"use client";
import React from "react";
// import { useRouter } from "next/navigation"; // Removed unused imports

const AboutPage = () => {
    // Note: The original unused functions are left out for a cleaner rewrite.

    return (
        <div className="bg-violet-100 min-h-screen flex justify-center">
            <div className="lg:w-3/4 w-screen mx-4 p-8 md:mt-0 mt-8 bg-white rounded-xl shadow-lg flex items-center justify-center flex-col">
                <h2 className="text-4xl font-bold text-violet-700 text-center">Welcome to My Blog</h2>

                <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                    Welcome to the central hub of inspiration and entertainment! <br />
                    This blog is dedicated to sharing diverse stories, insightful reflections, and engaging content designed to stimulate your mind and offer a pleasant escape from the everyday.
                </p>

                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                    Here, you'll find content across multiple categories: from speculative **Technology** reviews and thrilling **Adventure narratives** to unique **Life Insights** and captivating **Fictional Romances**. 
                </p>

                <p className="mt-6 text-2xl text-center italic text-gray-800">
                    "Every click is a new adventure; every story is a shared experience."
                </p>

            </div>
        </div>
    );
};

export default AboutPage;