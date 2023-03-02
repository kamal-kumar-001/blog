import { useRouter } from 'next/router'
import React from 'react'
import Tabs from '../../components/Tabs.js';
import BlogList from '../../components/blogList';
import Layout from '../../components/Layout';
import Container from '../../components/container';
import Head from 'next/head.js';

const Categories = ({ categories, blogs, navItems}) => {
  const router = useRouter()
  const { category } = router.query
  const filteredBlogs = blogs.filter(blog => blog.category && blog.category.slug === category)

  return <Layout navItems={navItems}>
    <Head>
    <title>{category.toUpperCase() + " | Blogs" || ''}</title>
        <meta
          name="description"
          content={"All the blogs related to "+ category.toUpperCase() || ''}
        />
        <meta
          name="theme-color"
          content="#000"
        />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Tabs categories={categories} />
    <Container>
    <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 lg:grid-cols-3 ">
            <BlogList blogs={filteredBlogs} aspect="landscape" />
            </div>
            </Container>
  </Layout>
}
export async function getServerSideProps({ params }) {
  // let baseUrl = process.env.URL
  let baseUrl = 'https://blog-jcxn.vercel.app/'
  const res = await fetch(`${baseUrl}/api/getBlog`);
  const data = await res.json();
  const navRes = await fetch(`${baseUrl}/api/navApi`);
  const navData = await navRes.json();

  return {
    props: {
      blogs: data.getBlogs,
      categories: data.categories,
      navItems: navData.navItems,
    },
  };
}

export default Categories
