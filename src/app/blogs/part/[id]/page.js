import React from 'react'
import Navbar from '@/app/components/Navbar'
import BlogPart from './BlogPart';
export default function page({ params }) {
    const { id } = params;
    return (

        <>
            <Navbar />
            <BlogPart id={id} />
        </>

    )
}
