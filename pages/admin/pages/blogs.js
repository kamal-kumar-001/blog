import Layout from '../../../adminComponents/AdminLayout';
import Link from 'next/link';
import React from 'react';
import Blog from '../../../models/Blog';
import Router from 'next/router';
import connectDb from '../../../middleware/mongoose';

const Blogs = ({ blogs }) => {
  const handleDelete = async (collection, id) => {
    const res = await fetch(`/api/deleteApi?collection=${collection}&id=${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
  
    if (res.ok) {
      console.log(data.message);
      Router.push('/admin/pages/blogs');
    } else {
      console.error(data.message);
    }
  };
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Blogs</h1>
        <Link href="/admin/pages/add/addBlog">
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
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context){
    await connectDb();
  
    let blogs = await Blog.find().populate('user').populate('category').sort({createdAt: -1});
   return {
      props: {
          blogs: JSON.parse(JSON.stringify(blogs)),

      },
    }
}

export default Blogs;

