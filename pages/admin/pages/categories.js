import Layout from '../../../components/adminComponents/AdminLayout';
import Link from 'next/link';
import React  from 'react';
import Router from 'next/router';

const Categories = ({ categories }) => {
  const handleDelete = async (collection, id) => {
    const res = await fetch(`/api/deleteApi?collection=${collection}&id=${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
  
    if (res.ok) {
      console.log(data.message);
      Router.push('/admin/pages/categories');
    } else {
      console.error(data.message);
    }
  };
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <Link href="/admin/pages/add/addCategory">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Add Category
          </button>
        </Link>

        <div className='overflow-x-auto'>

        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Categories</th>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">Post Count</th>
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
                  {category.postCount}
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

export async function getServerSideProps(context) {
  // let baseUrl = process.env.URL
  let baseUrl = 'https://blog-jcxn.vercel.app/'
  const res = await fetch(`${baseUrl}/api/getCategory`);
  const data = await res.json();
  return {
    props: {
      categories: data.categories,
    },
  };
}

export default Categories;

