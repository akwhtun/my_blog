"use client"
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { fetchBlogWithParts } from '../../view/manager';
import { useRouter } from 'next/navigation';
export default function GetBlogParts({ id }) {
    const blogId = id;
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [blog, setBlog] = useState([]);
    const [blogParts, setBlogParts] = useState([]);

    useEffect(() => {
        const loadBlogWithPart = async () => {
            try {
                setLoading(true);
                const fetchedData = await fetchBlogWithParts(blogId);
                if (fetchedData && fetchedData.blog && fetchedData.blogWithParts) {
                    setBlog(fetchedData.blog);
                    setBlogParts(fetchedData.blogWithParts);
                } else {
                    console.error("Fetched data does not have the expected structure");
                }
            } catch (error) {
                console.error("Error fetching blog data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (blogId) {
            loadBlogWithPart();
        } else {
            console.error("blogId is undefined");
        }

        setIsMounted(true);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [blogId]);


    if (!isMounted) return null;




    return (
        <div className="relative w-full min-h-screen bg-violet-200">
            {/* Main blog banner image */}
            <Image
                src={blog.imageUrl}
                alt="Romantic Banner"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="absolute object-cover w-full h-full filter brightness-75 opacity-95"
            />

            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-16 h-16 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
                </div>
            ) : blogParts.length > 0 ? (
                <div className="absolute inset-0 flex flex-col items-center text-center px-5 backdrop-blur-md overflow-auto h-full blog eng">
                    {/* Blog Details */}
                    <div className="flex flex-col items-center mt-16 pt-1 mb-2 ">
                        .              <button className="w-28 h-7 bg-gray-700 text-white text-center rounded-md  hover:bg-gray-600 transition cursor-pointer eng" onClick={() => router.back()}>
                            Back
                        </button>
                        <h1 className="ms-4 text-white text-2xl font-bold  leading-tight tracking-wide">
                            {blog.title}
                        </h1>
                    </div>
                    <p className="text-sm text-gray-300 my-2">{blog.content}</p>
                    <p className="text-sm text-gray-200">By: {blog.author}</p>
                    <p className="text-sm text-gray-200">
                        Published on: {new Date(blog.created_date).toLocaleDateString()}
                    </p>
                    <p className="text-white font-bold mt-2 leading-tight tracking-wide">
                        {blogParts.length > 1 ? (`Blog Parts - ${blogParts.length} Parts`) : (`Blog Part - ${blogParts.length} Part`)}
                    </p>

                    {/* Swiper Component */}
                    <div className="w-full flex justify-center mt-2">
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
                            {blogParts.map((part) => (
                                <SwiperSlide
                                    key={part._id}
                                    className="my-1 relative h-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl "
                                >
                                    {/* Blog Part Slide Content */}
                                    <div className="h-80 py-1 my-1 relative overflow-hidden rounded-lg transition-transform duration-300 blog">
                                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                                            <Image
                                                src={part.imageUrl}
                                                alt={part.part}
                                                width={500}
                                                height={300}
                                                className="w-full h-full rounded-lg object-cover filter contrast-125 brightness-90"
                                            />
                                            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div> {/* Overlay */}
                                        </div>

                                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-5 blog">
                                            <p className="text-gray-300 text-2xl font-extrabold">{part.part}</p>
                                            <p className="text-gray-300 text-sm my-2">
                                                {part.content.slice(0, 100)}...
                                            </p>
                                            <div className='flex justify-start gap-5 eng'>
                                                <Link href={`/blogs/part/${part._id}?blogId=${blog._id}&blogTitle=${blog.title}`}>
                                                    <button className="mt-2 px-2 bg-gradient-to-r from-gray-500 to-gray-700 text-gray-300 rounded-lg  hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-800 transition">
                                                        Read More
                                                    </button>
                                                </Link>

                                                <Link href={`/blogs/part/comments?partId=${part._id}&blogId=${part.article_id}`}>
                                                    <button className="mt-2 px-2 bg-gray-200 border-3 border-gray-900 rounded-md">
                                                        {part.commentCount > 0
                                                            ? `${part.commentCount} ${part.commentCount > 1 ? "Comments" : "Comment"}`
                                                            : "No Comment Yet"}
                                                    </button>

                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            ) : (
                <div className="text-white text-center mt-28">No blog parts found</div>
            )}
        </div>

    );

    // <div className="relative w-full h-screen overflow-hidden bg-black">
    //     {/* <Image
    //         src={bannerImg}
    //         alt="Romantic Banner"
    //         layout="fill"
    //         objectFit="cover"
    //         quality={100}
    //         className="absolute object-cover w-full h-full filter brightness-75"
    //     /> */}

    //     {loading ? (
    //         <div className="flex justify-center items-center h-screen">
    //             <div className="w-16 h-16 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
    //         </div>
    //     ) : (
    //         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 backdrop-blur-md">

    //             <h1 className="text-white text-4xl font-bold mt-20 mb-2 leading-tight tracking-wide">
    //                 Blog Parts - {blogParts.length}
    //             </h1>

    //             <Swiper
    //                 direction={'vertical'}
    //                 pagination={{
    //                     clickable: true,
    //                 }}
    //                 navigation={!isMobile}
    //                 scrollbar={{ draggable: true }}
    //                 modules={[Navigation, Pagination]}
    //                 mousewheel={true}
    //                 loop={true}
    //                 slidesPerView={2}
    //                 className="lg:w-1/3 md:w-2/3 w-full ounded-lg p-5"
    //             >
    //                 {blogParts.map((part) => (
    //                     <SwiperSlide
    //                         key={part._id}
    //                         className="h-96 relative transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
    //                     >
    //                         <div className="h-full relative overflow-hidden rounded-lg transition-transform duration-300">
    //                             <Image
    //                                 src={`/uploads/part/${part.imageUrl}`}
    //                                 alt={part.part}
    //                                 width={500}
    //                                 height={700}
    //                                 className="w-full h-full rounded-lg object-cover filter contrast-125 brightness-90"
    //                             />

    //                             <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-5 m-2 blog">
    //                                 <p className="text-white text-2xl font-extrabold">{part.part}</p>
    //                                 <p className="text-white text-sm my-2">
    //                                     {part.content.slice(0, 50)}...
    //                                 </p>
    //                                 <Link href={`/blogs/read/${part._id}`}>
    //                                     <button className="mt-2 py-2 px-4 bg-gradient-to-r from-gray-500 to-violet-700 text-white rounded-lg font-medium hover:bg-gradient-to-r hover:from-violet-600 hover:to-violet-800 transition">
    //                                         Read More
    //                                     </button>
    //                                 </Link>
    //                             </div>
    //                         </div>
    //                     </SwiperSlide>
    //                 ))}
    //             </Swiper>
    //         </div>
    //     )}
    // </div>

}
