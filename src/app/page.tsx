"use client"
import Image from "next/image";
import dbConnect from "./lib/dbConnect";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
// import dbConnect from '../utils/dbConnect';
// import Post from '../models/Post';
// import Layout from '../components/Layout';

export default function Home() {
  return (<>
    <Navbar />
    <Layout />
  </>

  );
}

// const createArticle = async () => {
//   await dbConnect();  // Connect to MongoDB

// };

// createArticle();

// export async function getServerSideProps() {
//   await dbConnect();
//   const posts = await Post.find({});
//   return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
// }

