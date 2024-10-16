// "use client"
// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { Navigation, Pagination } from 'swiper/modules';
// import Image from 'next/image';
// import bannerImg from '../public/images/banner.jpg'; // Update with your banner image path
// import Link from 'next/link';
// import { fetchBlogs } from './view/manager';
// export default function GetArticles() {
//     const [isMounted, setIsMounted] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);
//     const [blogs, setBlogs] = useState([])

//     useEffect(() => {
//         setIsMounted(true);
//         const loadBlogs = async () => {
//             try {
//                 setLoading(true);
//                 const fetchedBlogs = await fetchBlogs();
//                 setBlogs(fetchedBlogs);
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadBlogs();

//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 768);
//         };

//         window.addEventListener('resize', handleResize);

//         handleResize();

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);


//     if (!isMounted) return null;


//     return (

//         <div className="relative w-full h-screen overflow-hidden bg-violet-200">
//             <Image
//                 src={bannerImg}
//                 alt="Romantic Banner"
//                 layout="fill"
//                 objectFit="cover"
//                 quality={100}
//                 className="absolute object-cover w-full h-full filter brightness-75"
//             />

//             {loading ? (
//                 <div className="flex justify-center items-center h-screen">
//                     <div className="w-16 h-16 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
//                 </div>
//             ) :

//                 blogs.length > 0 ? (
//                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 backdrop-blur-md">
//                         <h1 className="text-white text-4xl font-bold mt-20 mb-2 leading-tight tracking-wide">
//                             All Blogs - {blogs.length}
//                         </h1>
//                         <Swiper
//                             direction={'vertical'}
//                             pagination={{
//                                 clickable: true,
//                             }}
//                             navigation={!isMobile}
//                             scrollbar={{ draggable: true }}
//                             modules={[Navigation, Pagination]}
//                             mousewheel={true}
//                             loop={true}
//                             slidesPerView={2}
//                             className="lg:w-1/3 md:w-2/3 w-full ounded-lg p-5"
//                         >
//                             {blogs.map((blog) => (
//                                 <SwiperSlide
//                                     key={blog._id}
//                                     className="h-96 relative transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
//                                 >
//                                     <div className="h-full relative overflow-hidden rounded-lg transition-transform duration-300">
//                                         <Image
//                                             src={`/uploads/article/${blog.imageUrl}`}
//                                             alt={blog.title}
//                                             width={500}
//                                             height={700}
//                                             className="w-full h-full rounded-lg object-cover filter contrast-125 brightness-90"
//                                         />
//                                         <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-5 m-2 blog">
//                                             <p className="text-white text-2xl font-extrabold">{blog.title}</p>
//                                             <p className="text-white text-sm my-2">
//                                                 {blog.content.slice(0, 50)}...
//                                             </p>
//                                             <Link href={`/blogs/read/${blog._id}`}>
//                                                 <button className="mt-2 py-2 px-4 bg-gradient-to-r from-violet-500 to-violet-700 text-white rounded-lg font-medium hover:bg-gradient-to-r hover:from-violet-600 hover:to-violet-800 transition">
//                                                     Read More
//                                                 </button>
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </div>
//                 ) : (
//                     <div className="text-3xl text-white text-center mt-40">No blog found</div>
//                 )

//             }
//         </div>


//     )

// }

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
                    <h1 className="text-white text-4xl font-bold mt-20 mb-2 leading-tight tracking-wide">
                        All Blogs - {blogs.length}
                    </h1>
                    <Swiper
                        direction={'vertical'}
                        pagination={{ clickable: true }}
                        navigation={!isMobile}
                        scrollbar={{ draggable: true }}
                        modules={[Navigation, Pagination]}
                        mousewheel={true}
                        loop={true}
                        slidesPerView={2}
                        className="lg:w-1/3 md:w-2/3 w-full rounded-lg p-5"
                    >
                        {blogs.map((blog) => (
                            <SwiperSlide
                                key={blog._id}
                                className="h-96 relative transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="h-full relative overflow-hidden rounded-lg transition-transform duration-300">
                                    <div className="relative h-full w-full rounded-lg overflow-hidden">
                                        <Image
                                            src={`/uploads/article/${blog.imageUrl}`}
                                            alt={blog.title}
                                            width={500}
                                            height={700}
                                            className="w-full h-full rounded-lg object-cover filter contrast-125 brightness-90"
                                        />
                                        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div> {/* Overlay */}
                                    </div>

                                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-5 m-2 blog">
                                        <p className="text-gray-300 text-2xl font-extrabold">{blog.title}</p>
                                        <p className="text-gray-300 text-sm my-2">
                                            {blog.content.slice(0, 100)}...
                                        </p>
                                        <Link href={`/blogs/read/${blog._id}`}>
                                            <button className="mt-2 py-2 px-4 bg-gradient-to-r from-violet-500 to-violet-700 text-white rounded-lg font-medium hover:bg-gradient-to-r hover:from-violet-600 hover:to-violet-800 transition">
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

