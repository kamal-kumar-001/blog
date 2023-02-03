import Layout from './components/AdminLayout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Blog from '../../models/Blog';
import User from '../../models/User';
import Category from '../../models/Category';
import mongoose from 'mongoose'
import Router from 'next/router';
import WithAuth from './withAuth';

const Admin = ({ blogs, users, categories }) => {

  // const handleDelete = async (collection, id) => {
  //   const res = await fetch(`api/deleteApi/${collection}/${id}`, {
  //     method: 'DELETE',
  //   });
  //   const data = await res.json();
  //   if (data.status === 'success') {
  //     Router.push('/admin');
  //   } else {
  //     console.error(data.message);
  //   }
  // };
  
  const handleDelete = async (collection, id) => {
    const res = await fetch(`/api/deleteApi?collection=${collection}&id=${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
  
    if (res.ok) {
      console.log(data.message);
      Router.push('/admin');
    } else {
      console.error(data.message);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <Link href="/admin/addBlog">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Add Blog
          </button>
        </Link>
        <div className='overflow-x-auto'>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="border px-4 py-2">{blog.title}</td>
                <td className="border px-4 py-2">
                  {blog.user.name}
                </td>
                <td className="border px-4 py-2">
                  {blog.category.name || ""}
                </td>
                <td className="border px-4 py-2">
                  {blog.createdAt}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    href="/admin/updateBlog/[blog]" 
                    as={`/admin/updateBlog/${blog._id}`}
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                      Update
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleDelete('blogs', blog._id)}
                    // onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className='overflow-x-auto'>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">
                  {user.email}
                </td>
                <td className="border px-4 py-2">
                  {user.createdAt}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    href="/admin/updateUser/[user]" 
                    as={`/admin/updateUser/${user._id}`}
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                      Update
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleDelete('users', user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Categories</th>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="border px-4 py-2">{category.name}</td>
                <td className="border px-4 py-2">
                  {category.slug}
                </td>
                <td className="border px-4 py-2">
                  {category.createdAt}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    href="/admin/updateCategory/[category]" 
                    as={`/admin/updateCategory/${category._id}`}
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                      Update
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleDelete('categories', category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context){
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URL)
    }
  
    let blogs = await Blog.find().populate('user').populate('category').sort({createdAt: -1});
    let categories = await Category.find();
    let user = await User.find().sort({createdAt: -1});
   return {
      props: {
          blogs: JSON.parse(JSON.stringify(blogs)),
          categories: JSON.parse(JSON.stringify(categories)),
          users: JSON.parse(JSON.stringify(user)), 
      },
    }
}

// export default Admin;

export default WithAuth(Admin);


// import React  from 'react';
// import Layout from '../../components/Layout';
// import Link from 'next/link';
// import Blog from '../../models/Blog';
// import User from '../../models/User';
// import Category from '../../models/Category';
// import mongoose from 'mongoose'

// const AdminIndex = ({blogs,categories,users}) => {
//   return (
//     <Layout>
//     <h2 className="text-xl font-bold mb-4">Blogs</h2>
//     <ul className="list-disc">
//       {blogs.map(blog => (
//         <li key={blog._id} className="my-2">
//           <Link href="/admin/updateBlog/[blog]" as={`/admin/updateBlog/${blog._id}`}>
//             <span className="text-blue-500 hover:text-blue-800">{blog.title}</span>
//           </Link>
//         </li>
//       ))}
//     </ul>
//     <h2 className="text-xl font-bold mb-4">Users</h2>
//     <ul className="list-disc">
//       {users.map(user => (
//         <li key={user._id} className="my-2">
//           <Link href="/admin/updateUser/[user]" as={`/admin/updateUser/${user._id}`}>
//             <span className="text-blue-500 hover:text-blue-800">{user.name}</span>
//           </Link>
//         </li>
//       ))}
//     </ul>
//     <h2 className="text-xl font-bold mb-4">Categories</h2>
//     <ul className="list-disc">
//       {categories.map(category => (
//         <li key={category._id} className="my-2">
//           <Link href="/admin/updateCategory/[category]" as={`/admin/updateCategory/${category._id}`}>
//             <span className="text-blue-500 hover:text-blue-800">{category.name}</span>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </Layout>
// );
// };

// export async function getServerSideProps(context){
//     if (!mongoose.connections[0].readyState) {
//       await mongoose.connect(process.env.MONGO_URL)
//     }
  
//     let blogs = await Blog.find();
//     let categories = await Category.find();
//     let user = await User.find();
//    return {
//       props: {
//           blogs: JSON.parse(JSON.stringify(blogs)),
//           categories: JSON.parse(JSON.stringify(categories)),
//           users: JSON.parse(JSON.stringify(user)), 
//       },
//     }
// }

// export default AdminIndex;
