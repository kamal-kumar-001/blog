import Layout from '../../../adminComponents/AdminLayout';
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import Category from '../../../models/Category';
import Router from 'next/router';
import connectDb from '../../../middleware/mongoose';

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
    await connectDb();
  
    let categories = await Category.find().sort({createdAt: -1});

   return {
      props: {
          categories: JSON.parse(JSON.stringify(categories)),
      },
    }
}

export default Categories;

