/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI: process.env.MONGODB_URI
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
};

export default nextConfig;
