import Head from 'next/head';
import BlogList from './blogList';
import Tabs from './Tabs';
import { useRouter } from 'next/router';
import Layout from './Layout';
import Container from './container';

import React from "react";

const Blog = ({ categories, blogs, navItems, page, pageCount }) => {
  const router = useRouter();

  // const { page, pageCount } = articles.pagination;

  // const handleSearch = (query: string) => {
  //     router.push(`/?search=${query}`);
  // };


  return (
    <Layout navItems={navItems}>
      <Head>
        <title>All Blogs</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="theme-color"
          content="#000"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tabs
        categories={categories}
      // handleOnSearch={debounce(handleSearch, 500)}
      />
      <Container>
        {/* <div className="grid gap-10 lg:gap-10 md:grid-cols-2 ">
            <BlogList blogs={blogs} author={author} aspect="landscape"/>
            </div> */}
            {/* <details>
              This is details about the blog
              <summary>
                test
              </summary>
            </details> */}
        <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 lg:grid-cols-3 ">
          <BlogList blogs={blogs} aspect="landscape" />
        </div>
        {/* <Pagination page={page} pageCount={pageCount} /> */}
      </Container>
    </Layout>
  );
};
export default Blog;

