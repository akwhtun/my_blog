"use client"
import React, { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import bannerImg from '../public/images/banner.jpg';
import Link from 'next/link';
import { fetchBlogs } from '../blogs/view/manager';

const Layout = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                setLoading(true);
                const fetchedBlogs = await fetchBlogs();
                setBlogs(fetchedBlogs);
            } catch (error) {
                console.log(error);
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

    const shouldLoop = blogs.length > 3;

    return (
        <div className="relative w-full h-screen bg-gradient-to-b from-purple-800 to-purple-900">
            <Image
                src={bannerImg}
                alt="Romantic Banner"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="absolute opacity-80"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 space-y-8">
                {loading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <div className="w-16 h-16 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    blogs.length > 0 ?
                        (<>
                            <h1 className="text-violet-100 text-4xl md:text-6xl font-extrabold mb-3 mt-6 text-center drop-shadow-lg animate-fadeInUp">
                                Blog Highlights
                            </h1>

                            <Swiper
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                modules={[Navigation, Pagination]}
                                loop={shouldLoop}
                                centeredSlides={blogs.length < 3}
                                className="w-full px-4 md:px-20"
                                spaceBetween={30}
                                navigation={!isMobile} // Disable navigation on mobile
                                breakpoints={{
                                    640: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }}
                                style={{
                                    "--swiper-navigation-color": "#ffffff",
                                    "--swiper-pagination-color": "#ffffff",
                                }}
                            >
                                {blogs.map((blog) => (
                                    <SwiperSlide
                                        key={blog._id}
                                        className="transform transition duration-500 "
                                    >
                                        <div className="relative rounded-lg shadow-lg transition-transform duration-300  hover:shadow-2xl bg-gradient-to-b from-purple-600 via-purple-500 to-purple-400">

                                            <div className="relative rounded-lg flex justify-center w-full h-full">
                                                <Image
                                                    src={blog.imageUrl}
                                                    alt={blog.title}
                                                    width={800}
                                                    height={700}
                                                    className="object-cover rounded-lg"
                                                />
                                                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div> {/* Overlay */}
                                            </div>


                                            <div className="blog absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent transition-opacity duration-300 p-4 opacity-90 hover:opacity-100">
                                                <p className="text-gray-300 blog text-2xl font-semibold drop-shadow-lg mb-2">
                                                    {blog.title}
                                                </p>
                                                <p className="text-gray-300 text-md mb-4">
                                                    {blog.content.slice(0, 100)}...
                                                </p>

                                                <Link href={`/blogs/read/${blog._id}`} className='cursor-pointer'>
                                                    <button className="mt-2 py-1 px-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg font-medium hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-800 transition ">
                                                        Read More
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </>) : (<div>
                            <h1 className="text-violet-100 text-4xl md:text-6xl font-extrabold mb-3 mt-2 text-center drop-shadow-lg animate-fadeInUp">
                                No Blog Found
                            </h1>
                        </div>)
                )}
            </div>
        </div>
    );
};


export default Layout;
