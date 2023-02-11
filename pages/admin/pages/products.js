import Layout from '../../../adminComponents/AdminLayout';
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import Router from 'next/router';
import Product from '../../../models/Shop/Product';
import connectDb from '../../../middleware/mongoose';

const Products = ({ products }) => {
  const handleDelete = async (collection, id) => {
    const res = await fetch(`/api/deleteApi?collection=${collection}&id=${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
  
    if (res.ok) {
      console.log(data.message);
      Router.push('/admin/pages/products');
    } else {
      console.error(data.message);
    }
  };

  
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <Link href="/admin/pages/add/addProduct">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Add Product
          </button>
        </Link>
        
        <div className='overflow-x-auto'>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Products</th>
              <th className="px-4 py-2">slug</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td className="border px-4 py-2">{p.title}</td>
                <td className="border px-4 py-2">
                  {p.slug}
                </td>
                <td className="border px-4 py-2">
                  {p.price}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    href="/admin/updateProduct/[product]" 
                    as={`/admin/updateProduct/${p._id}`}
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                      Update
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleDelete('products', p._id)}
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
  
    
    let product = await Product.find().sort({createdAt: -1});
   return {
      props: {

          products: JSON.parse(JSON.stringify(product)), 
      },
    }
}

export default Products;

