import Layout from '../../adminComponents/AdminLayout';
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import Blog from '../../models/Blog';
import User from '../../models/User';
import Category from '../../models/Category';
import Router from 'next/router';
import WithAuth from './withAuth';
import Product from '../../models/Shop/Product';
import connectDb from '../../middleware/mongoose';

const Admin = ({ blogs, users, categories, products }) => {

  // const [totalViews, setTotalViews] = useState(0);
  // const [newContacts, setNewContacts] = useState(0);
  // const [newsletterSubscriptions, setNewsletterSubscriptions] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch('/api/getAnalytics',{
  //       method : 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     });
  //     setTotalViews(res.data.totalViews);
  //     setNewContacts(res.data.newContacts);
  //     setNewsletterSubscriptions(res.data.newsletterSubscriptions);
  //   };

  //   fetchData();
  // }, []);
  
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <Link href="/admin/pages/add/addBlog">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
            Add Blog
          </button>
        </Link>
        <Link href="/admin/pages/add/addCategory">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
            Add Category
          </button>
        </Link>
        <Link href="/admin/pages/add/addUser">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4">
            Add User
          </button>
        </Link>
        <Link href="/admin/pages/add/addNav">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Add NavItem
          </button>
        </Link>
        {/* <div>
      <h2>Total Views: {totalViews}</h2>
      <h2>New Contacts: {newContacts}</h2>
      <h2>Newsletter Subscriptions: {newsletterSubscriptions}</h2>
    </div> */}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context){
    await connectDb();
  
    let blogs = await Blog.find().populate('user').populate('category').sort({createdAt: -1});
    let categories = await Category.find().sort({createdAt: -1});
    let user = await User.find().sort({createdAt: -1});
    let product = await Product.find().sort({createdAt: -1});
   return {
      props: {
          blogs: JSON.parse(JSON.stringify(blogs)),
          categories: JSON.parse(JSON.stringify(categories)),
          products: JSON.parse(JSON.stringify(product)), 
          users: JSON.parse(JSON.stringify(user)), 
      },
    }
}

export default WithAuth(Admin);

