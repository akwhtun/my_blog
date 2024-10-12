"use client";
import { useState, useEffect } from "react";
import GetArticles from "./GetArticles"; // Make sure this is defined
import Navbar from "../components/Navbar"; // Ensure this is defined

export default function Page() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/blogs');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlogs(data.articles); // Set the articles fetched
                setLoading(false); // Stop loading
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false); // Stop loading even if there's an error
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            {blogs && blogs.map((blog, index) => (
                <div key={index}>{blog.title}</div> // Adjust as per your article structure
            ))}
        </>
    );
}
