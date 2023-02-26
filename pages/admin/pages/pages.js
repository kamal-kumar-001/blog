import Layout from '../../../components/adminComponents/AdminLayout';
import Link from 'next/link';
import React from 'react';
import Router from 'next/router';

const Pages = ({ pages }) => {
  const handleDelete = async (collection, id) => {
    const res = await fetch(`/api/deleteApi?collection=${collection}&id=${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
  
    if (res.ok) {
      console.log(data.message);
      Router.push('/admin/pages/pages');
    } else {
      console.error(data.message);
    }
  };
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Pages</h1>
        <Link href="/admin/pages/add/addPage">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Add Page
          </button>
        </Link>
        <div className='overflow-x-auto'>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page._id}>
                <td className="border px-4 py-2">{page.title}</td>
                <td className="border px-4 py-2">
                  {page.slug}
                </td>
                <td className="border px-4 py-2">
                  {page.desc || ""}
                </td>
                <td className="border px-4 py-2">
                  {page.createdAt}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    href="/admin/updatePage/[[...slug]]" 
                    as={`/admin/updatePage/${page.slug}`}
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                      Update
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleDelete('pages', page._id)}
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

export async function getServerSideProps(context) {
  let baseUrl = process.env.URL
  const res = await fetch(`${baseUrl}/api/pageApi`);
  const data = await res.json();
  return {
    props: {
      pages: data.pages,
    },
  };
}
export default Pages;

