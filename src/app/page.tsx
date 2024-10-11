"use client"
import Image from "next/image";

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

// export async function getServerSideProps() {
//   await dbConnect();
//   const posts = await Post.find({});
//   return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
// }

