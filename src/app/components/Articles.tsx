import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules'; // Import required modules
import bannerImg from '../public/images/banner.jpg'; // Update with your banner image path
import article1 from '../public/images/article.jpg'; // Update with the actual image path
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
        title: 'A Day to Remember',
        content: 'A special day etched in our memories.',
        imageUrl: article1,
        link: '/articles/day-to-remember',
    },
];

const Layout = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Image
                src={bannerImg}
                alt="Romantic Banner"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="absolute"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-5">
                <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-6 text-center drop-shadow-lg">Blog Highlights</h1>

                {/* Swiper for Articles - Vertical scrolling */}
                <Swiper
                    direction="vertical" // Set direction to vertical
                    navigation={true}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    modules={[Navigation, Pagination]}
                    mousewheel={true} // Enable mousewheel control for smooth scrolling
                    loop={true}
                    className="w-full h-full"
                    slidesPerView={1} // Show one article at a time in the vertical scroll
                    spaceBetween={50} // Space between the articles
                >
                    {articles.map((article, index) => (
                        <SwiperSlide key={index}>
                            <Link href={article.link} className="group">
                                <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 h-screen flex flex-col justify-center items-center">
                                    <Image
                                        src={article.imageUrl}
                                        alt={article.title}
                                        width={400}
                                        height={300}
                                        className="w-full h-auto rounded-lg"
                                    />
                                    <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-50 transition-opacity duration-300 p-4">
                                        <p className="text-white text-xl font-bold">{article.title}</p>
                                        <p className="text-white text-sm mb-2">
                                            {article.content.slice(0, 50)}...
                                        </p>
                                        {/* Read button */}
                                        <Link href={article.link}>
                                            <button className="mt-2 py-1 px-3 bg-white text-black rounded-lg hover:bg-gray-200">
                                                Read
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Layout;
