import React, { useEffect, useState } from 'react';
import BlogList from '../components/blogList';
import Tabs from '../components/Tabs';
import Blog from '../models/Blog'
import mongoose from 'mongoose'
import Category from '../models/Category';
import Layout from '../components/Layout';
import Container from '../components/container';
import Link from 'next/link';

const Blogs  = ({ blogs,author, categories }) => {

  return (
    <Layout>
          {/* <NextSeo
            title={`Blog — ${siteConfig?.title}`}
            description={siteConfig?.description || ""}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: `Blog — ${siteConfig?.title}`,
              description: siteConfig?.description || "",
              images: [
                {
                  url: "",
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: "Web3Forms"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          /> */}
          <Container>
            <h1 className="text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
              Archive
            </h1>
            <div className="text-center">
              <p className="mt-2 text-lg">
                See all posts we have ever written.
              </p>
            </div>
            <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-3 xl:grid-cols-3 ">
            <BlogList blogs={blogs} aspect="aspect-square"/>
            </div>
          </Container>
        </Layout>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL)
  }

  let blogs = await Blog.find().populate("user").populate("category").sort({createdAt: -1});
  let categories = await Category.find();

  return {
    props: { 
      blogs: JSON.parse(JSON.stringify(blogs)) ,
      categories: JSON.parse(JSON.stringify(categories)),
    },
    
  }
}

export default Blogs;

