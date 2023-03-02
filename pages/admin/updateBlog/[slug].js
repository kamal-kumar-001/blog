import React  from 'react';
// import Router from 'next/router';
import WithAuth from '../withAuth';
// import Layout from '../components/AdminLayout';
// import Link from "next/link";
import BlogForm from '../../../components/adminComponents/BlogForm';
const UpdateBlog = ({ blog, categories, users }) => {

  return <BlogForm initialValues={{title: blog.title, content: blog.content, slug: blog.slug, img: blog.img, category: blog.category, user: blog.user, metaContent: blog.metaContent}} 
  mode="update" blog={blog} categories={categories} users={users}/>;
};
export async function getServerSideProps({ params }) {
  const { slug } = params;
  // const baseUrl = process.env.URL;
  let baseUrl = 'https://blog-jcxn.vercel.app/'
  const res = await fetch(`${baseUrl}/api/updateBlog/${slug}`);
  const blog = await res.json();
  const userRes = await fetch(`${baseUrl}/api/getUser`);
  const usersData = await userRes.json();
  const catRes = await fetch(`${baseUrl}/api/getCategory`);
  const categoriesData = await catRes.json();

  return {
    props: {
      blog: blog,
      users: usersData.users,
      categories: categoriesData.categories,
    },
  };
}
export default WithAuth(UpdateBlog);

