"use client"
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import bannerImg from '../../public/images/banner.jpg';
import article1 from '../../public/images/article.jpg'; //
import Link from 'next/link';
const articles = [
    {
        title: 'Our First Meeting',
        content: 'A memorable day filled with laughter and smiles.',
        imageUrl: article1,
        link: '/articles/first-meeting',
    },
    {
        title: 'Memorable Moments',
        content: 'Cherished moments that bind us closer together.',
        imageUrl: article1,
        link: '/articles/memorable-moments',
    },
    {
        title: 'Our First Meeting',
        content: 'A memorable day filled with laughter and smiles.',
        imageUrl: article1,
        link: '/articles/first-meeting',
    },
    {
        title: 'Memorable Moments',
        content: 'Cherished moments that bind us closer together.',
        imageUrl: article1,
        link: '/articles/memorable-moments',
    },
    // Add more articles as needed
];

export default function Article() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null; // Prevent SSR issues by not rendering on the server


    return (
        <div className="relative w-full h-screen">
            <Image
                src={bannerImg}
                alt="Romantic Banner"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="absolute"

            />

            <div className="absolute bg-blue-500 inset-0 flex flex-col items-center justify-center px-5">
                <h1 className="text-white text-5xl font-extrabold mb-6 mt-20 text-center drop-shadow-lg">My Love Journey </h1>

                {/* Swiper for Articles */}
                <Swiper
                    direction={'vertical'}
                    pagination={{
                        clickable: true,
                    }}
                    // modules={[Pagination]}
                    navigation={true}
                    scrollbar={{ draggable: true }}
                    modules={[Navigation, Pagination]}
                    mousewheel={true} // Enable mousewheel control for smooth scrolling
                    loop={true}
                    className="bg-red-800"
                    slidesPerView={2} // Show one article at a time in the vertical scroll

                >
                    {articles.map((article, index) => (
                        <SwiperSlide key={index} className="bg-green-500  border-2">

                            <div className="h-full p-5 relative overflow-hidden rounded-lg  transition-transform duration-300 transform hover:scale-105">
                                <Image
                                    src={article.imageUrl}
                                    alt={article.title}
                                    width={270}
                                    className="w-full h-full rounded-lg"
                                />
                                <div className="absolute inset-0 flex flex-col justify-end p-5 m-2">
                                    <p className="text-white text-xl font-bold">Part1</p>
                                    <p className="text-white text-xl font-bold">{article.title}</p>
                                    <p className="text-white text-sm mb-2">
                                        {article.content.slice(0, 30)}...
                                    </p>
                                    {/* Read button */}
                                    <Link href={article.link}>
                                        <button className="mt-2 py-1 px-3 bg-white text-black rounded-lg hover:bg-gray-200">
                                            Read
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );

}
