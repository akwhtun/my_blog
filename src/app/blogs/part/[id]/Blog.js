"use client"
import Image from 'next/image';
import bannerImg from '../../../public/images/banner.jpg';
import Link from 'next/link';


export default function Blog() {


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

            <div className="absolute  inset-0 px-5 pb-1 mt-8 flex flex-col items-center">
                <h1 className="text-white text-5xl font-extrabold text-center drop-shadow-lg mt-12 mb-6">My Love Journey </h1>
                <div className='border-2 lg:w-4/12 md:w-8/12 sm:w-9/12 w-full h-full px-3 py-1 relative'>
                    {/* Love Letter Content */}
                    <p className="text-lg text-gray-700  leading-relaxed font-cursive mb-4">
                        The first time I saw you, I fell in love with you deeply. Slowly, I
                        found that I would be happy with you when you are happy, and I would
                        be sad with you when you are sad.
                        Later, we finally got together and had a perfect and happy time. I
                        always feel that meeting you is my luck. I am grateful for all the
                        beautiful memories we’ve shared. I regard these as my most precious
                        gifts.
                        I hope that we will continue to stay in touch in the future and create
                        a better life together.
                    </p>

                    {/* Signature */}
                    <div className="text-right font-cursive text-xl text-pink-600 absolute right-2 bottom-1">
                        Your Forever Love
                    </div>
                </div>
            </div>





        </div>
    );

}
