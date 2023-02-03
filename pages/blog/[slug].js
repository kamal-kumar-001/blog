import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Blog from '../../models/Blog'
import User from '../../models/User'
import Category from '../../models/Category'
import mongoose from 'mongoose'
import Link from 'next/link';
// import cheerio from 'cheerio';
// import Head from 'next/head';
import Layout from '../../components/Layout';
import Container from '../../components/container';
import CategoryLabel from '../../components/category'
import { parseISO, format } from "date-fns";
import Image from "next/image";
import { NextSeo } from "next-seo";
// import Pagination from '../../components/Pagination';

const Post = ({ blogs, author, category, page, pageCount }) => {
  const router = useRouter()
  const { slug } = router.query

  const [post, setPost] = useState(null)

    // const [currentPage, setCurrentPage] = useState(1);
    // const [postsPerPage] = useState(1);
  
    // useEffect(() => {
    //   setCurrentPage(router.query.page ? +router.query.page : 1);
    // }, [router.query.page]);
  
    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // // const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);
  
    // const handlePageChange = (page) => {
    //   setCurrentPage(page);
    //   router.push(`/post/[slug]?page=${page}`, `/post/${router.query.slug}?page=${page}`, { shallow: true });
    // };

  useEffect(() => {
    setPost(blogs)
  }, [blogs])
  function createMarkup(c) {
    return { __html: c };
  }

  return <>
    <Layout >
       
  {post &&
  <div>
    <NextSeo
            title={`${post.title} `}
            description={post.metaContent || ""}
            canonical={`/post/${post.slug.current}`}
            openGraph={{
              url: `/post/${post.slug.current}`,
              title: `${post.title} `,
              description: post.metaContent || "",
              images: [
                {
                  url: post.img || "",
                  width: 800,
                  height: 600,
                  alt: post.category.name || ""
                }
              ],
              site_name: "title"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          /> 
    <Container>
      <div className="max-w-screen-md mx-auto">
        <div className="text-center">
          <CategoryLabel categories={category} />
        </div>

        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          {post.title}
        </h1>

        <div className="flex justify-center mt-3 space-x-3 text-gray-500">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0 w-10 h-10">
                <Image
                  src={author.img}
                  // blurDataURL={AuthorimageProps.blurDataURL}
                  // loader={AuthorimageProps.loader}
                  // objectFit="cover"
                  alt={author.name}
                  // placeholder="blur"
                  // layout="fill"
                  fill
                  className="rounded-full object-cover"
                />
            </div>
            <div>
              <p className="text-gray-800 dark:text-gray-400">
                {author.name}
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <time
                  className="text-gray-500 dark:text-gray-400"
                  dateTime={ post.createdAt}>
                  {format(
                    parseISO( post.createdAt),
                    "MMMM dd, yyyy"
                  )}
                </time>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
    <div className="relative z-0 max-w-screen-lg mx-auto overflow-hidden lg:rounded-lg aspect-video">
              <Image
                src={post.img}
                // loader={imageProps.loader}
                // blurDataURL={imageProps.blurDataURL}
                alt={"Thumbnail"}
                // layout="fill"
                fill
                loading="eager"
                // objectFit="cover"
              />
          </div>
    <div className="flex  flex-col-reverse md:flex-row">
      <Container>
        <article className="max-w-screen-md mx-auto">
          <div className="mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-500" dangerouslySetInnerHTML={createMarkup(post.content)} />
          <div className="flex justify-center mt-7 mb-7">
            <Link href="/">
              <span className="px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20">
                {/* ← View all posts */}
              </span>
            </Link>
          </div>
        </article>
        {/* <Pagination
          post={post}
          pageCount={blogs.length}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        /> */}
      </Container>
    </div>
    </div>
  }
</Layout>

  </>
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL)
  }
  let page = context.query.page ? parseInt(context.query.page) : 1;
  
  let limit = 1; // number of posts per page
  // let offset = (page - 1) * limit;
  let blog = await Blog.findOne({ slug: context.query.slug });
  const user = await User.findById(blog.user)
  const category = await Category.findById(blog.category)
  // let totalPosts = await Blog.countDocuments();

  return {
    props: {
      blogs: JSON.parse(JSON.stringify(blog)),
      author: JSON.parse(JSON.stringify(user)),
      category: JSON.parse(JSON.stringify(category)),
      // page: page,
      // pageCount: Math.ceil(totalPosts / 1),
      // limit: limit,
      // offset: offset

    },
  }
}

export default Post
  
