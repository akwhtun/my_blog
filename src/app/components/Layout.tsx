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
    // Add more articles as needed
];

const Layout = () => {
    // Conditionally enable loop based on article count
    const shouldLoop = articles.length > 3; // Assuming loop makes sense if there are more than 3 articles

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

            <div className="absolute inset-0 flex flex-col items-center justify-center px-5">
                <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-6 text-center drop-shadow-lg">Blog Highlights</h1>

                {/* Swiper for Articles */}
                <Swiper
                    navigation={true}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    modules={[Navigation, Pagination]}
                    loop={shouldLoop} // Enable loop only if articles.length > 3
                    centeredSlides={articles.length < 3} // Center slides if less than 3 articles
                    className="w-full px-4 md:px-20"
                    spaceBetween={30}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                // style={{
                //     "--swiper-navigation-color": '#ffff',
                //     "--swiper-pagination-color": '#ffff',
                // }}
                >
                    {articles.map((article, index) => (
                        <SwiperSlide key={index} className="bg-gradient-to-b from-purple-500 via-pink-500 to-red-500">

                            <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                                <Image
                                    src={article.imageUrl}
                                    alt={article.title}
                                    width={300}
                                    height={200}
                                    className="w-full h-auto rounded-lg"
                                />
                                <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-50 transition-opacity duration-300 p-4">
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
};

export default Layout;
