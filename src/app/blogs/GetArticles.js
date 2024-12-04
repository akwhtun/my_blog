"use client";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import bannerImg from '../public/images/banner.jpg'; // Update with your banner image path
import Link from 'next/link';
import { fetchBlogs } from './view/manager';

export default function GetArticles() {
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        setIsMounted(true);

        const loadBlogs = async () => {
            try {
                setLoading(true);
                const fetchedBlogs = await fetchBlogs();

                // Ensure that `fetchedBlogs` is an array, or set to an empty array if it's not valid.
                setBlogs(fetchedBlogs && fetchedBlogs.length > 0 ? fetchedBlogs : []);
            } catch (error) {
                console.log(error);
                setBlogs([]); // In case of an error, set blogs to an empty array to show "No blog found"
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!isMounted) return null;

    return (
        <div className="relative w-full h-screen overflow-hidden bg-violet-200">
            <Image
                src={bannerImg}
                alt="Romantic Banner"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="absolute object-cover w-full h-full filter brightness-75"
            />



            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="w-16 h-16 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
                </div>
            ) : blogs.length > 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 backdrop-blur-md">

                    <Link href={`/`} className='cursor-pointer'>
                        <div className='w-28 h-7 bg-gray-700 text-white text-center rounded-md mt-24'>
                            Back
                        </div>
                    </Link>

                    <h1 className="text-white text-3xl font-bold mt-2 mb-2 leading-tight tracking-wide">
                        All Blogs - {blogs.length}
                    </h1>
                    <Swiper

                        direction={'vertical'}
                        pagination={{ clickable: true }}
                        navigation={!isMobile}
                        scrollbar={{ draggable: true }}
                        spaceBetween={30}
                        modules={[Navigation, Pagination]}
                        mousewheel={true}
                        slidesPerView={2}


                        className="w-full max-w-md h-[690px]"
                        style={{
                            "--swiper-navigation-color": "#ffffff",
                            "--swiper-pagination-color": "#ffffff",
                        }}
                    >
                        {blogs.map((blog) => (
                            <SwiperSlide
                                key={blog._id}
                                className="h-96 relative transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="h-full relative overflow-hidden rounded-lg transition-transform duration-300 ">
                                    <div className="relative h-full w-full rounded-lg overflow-hidden">
                                        <Image
                                            src={blog.imageUrl}
                                            alt={blog.title}
                                            width={1000}
                                            height={1000}
                                            className="w-full h-full rounded-lg object-cover filter contrast-125 brightness-90"
                                        />
                                        <div className="absolute inset-0 bg-black opacity-70 rounded-lg"></div>
                                    </div>

                                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-6 blog">
                                        <p className="text-gray-300 text-2xl font-extrabold">{blog.title}</p>
                                        <p className="text-gray-300 text-sm my-2">
                                            {blog.content.slice(0, 100)}...
                                        </p>
                                        <Link href={`/blogs/read/${blog._id}`} className='cursor-pointer'>
                                            <button className="mt-2 py-1 px-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg font-medium hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-800 transition">
                                                Read More
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}


                    </Swiper>
                </div>
            ) : (
                <div className="text-3xl text-white text-center mt-40">No blog found</div>
            )}
        </div>
    );
}

