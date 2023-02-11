import React, { useState, useEffect } from 'react';
// import Router from 'next/router';
import Blog from '../../../models/Blog';
import connectDb from '../../../middleware/mongoose';
import Category from '../../../models/Category';
import User from '../../../models/User';
import WithAuth from '../withAuth';
// import Layout from '../components/AdminLayout';
// import Link from "next/link";
import BlogForm from '../components/BlogForm';
const UpdateBlog = ({ blog, categories, users }) => {

  return <BlogForm initialValues={{title: blog.title, content: blog.content, slug: blog.slug, img: blog.img, category: blog.category, user: blog.user, metaContent: blog.metaContent}} 
  mode="update" blog={blog} categories={categories} users={users}/>;
};

export async function getServerSideProps({ query }) {
  await connectDb();
  const blog = await Blog.findOne({ _id: query.slug });
  const category = await Category.find();
  const user = await User.find();
  return {
    props: {
      blog: JSON.parse(JSON.stringify(blog)),
      categories: JSON.parse(JSON.stringify(category)),
      users: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default WithAuth(UpdateBlog);

