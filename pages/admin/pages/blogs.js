import Layout from '../../../components/adminComponents/AdminLayout';
import DeleteConfirmationModal from '../../../components/adminComponents/deleteModal';
import Link from 'next/link';
import React, { useState } from 'react';
import Router from 'next/router';
import { MdDelete } from 'react-icons/md'
import { TiEdit } from 'react-icons/ti'

const Blogs = ({ blogs }) => {

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState();


  const showDeleteConfirmationModal = (blogId) => {
    setBlogToDelete(blogId);
    setShowConfirmationModal(true);
  };
  

  const handleDelete = async (collection, id) => {
    console.log('Deleting blog with id:', id);
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
                    {blog.user ? blog.user.name : ""}
                  </td>
                  <td className="border px-4 py-2">
                  {blog.category ? blog.category.name : ""}
                  </td>
                  <td className="border px-4 py-2">
                    {blog.createdAt}
                  </td>
                  <td className="border px-4 py-2">
                    <Link
                      href="/admin/updateBlog/[blog]"
                      as={`/admin/updateBlog/${blog.slug}`}
                    >
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                        {/* Update */}
                        <TiEdit size={20} />
                      </button>
                    </Link>
                    {/* <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleDelete('blogs', blog._id)}
                    // onClick={() => handleDelete(blog._id)}
                  >
                    <MdDelete size={20}/>
                  </button> */}
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => showDeleteConfirmationModal(blog._id)}
                    >
                      <MdDelete size={20} />
                    </button>
                    <DeleteConfirmationModal
                      show={showConfirmationModal && blog._id === blogToDelete}
                      onConfirm={() => handleDelete('blogs', blog._id)}
                      onClose={() => setShowConfirmationModal(false)}
                    />
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

export async function getServerSideProps(context) {
  let baseUrl = process.env.URL
  const res = await fetch(`${baseUrl}/api/getBlog`);
  const data = await res.json();
  return {
    props: {
      blogs: data.getBlogs,
    },
  };
}
export default Blogs;

