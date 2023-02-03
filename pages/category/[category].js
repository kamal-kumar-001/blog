import { useRouter } from 'next/router'
import React from 'react'
import Tabs from '../../components/Tabs.js';
import connectDb from '../../middleware/mongoose';
import Category from '../../models/Category';
import Blog from '../../models/Blog'
import BlogList from '../../components/blogList';
import Layout from '../../components/Layout';
import Container from '../../components/container';

const Categories = ({ categories, blogs}) => {
  const router = useRouter()
  const { category } = router.query
  const filteredBlogs = blogs.filter(blog => blog.category.slug === category)

  return <Layout>
    <Tabs categories={categories} />
    <Container>
    <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
            <BlogList blogs={filteredBlogs} aspect="landscape" />
            </div>
            </Container>
  </Layout>
}
export async function getServerSideProps(context) {
  await connectDb();
  let getBlogs = await Blog.find().populate('user').populate("category").sort({createdAt: -1});
  let categories = await Category.find().sort({createdAt: -1});
  return {
    props: {
      blogs: JSON.parse(JSON.stringify(getBlogs)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  }
}

export default Categories
