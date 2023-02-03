import React, { useState } from 'react';
import Layout from './components/AdminLayout';
import Router from 'next/router';
import mongoose from 'mongoose'
import WithAuth from './withAuth';
import Link from 'next/link';

const AdminAddProduct = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [img, setImg] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/addApi?collection=products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            slug: slug,
            img: img,
            content: content,
            price: price,
        })
    });
    if (res.ok) {
        Router.push('/admin');
    }
};


  return (
    <form className='p-5' onSubmit={handleSubmit}>
        <div className="flex gap-5 justify-between">
      <h1 className="text-2xl flex-1  font-bold mb-4">Add Product</h1>
      <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
           <Link href={"/admin"}>Cancel</Link>
        </button>
      <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          type="submit"
        >
          Save
        </button>
        </div>
        <div className="mb-4">
          <label
            className="block font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block font-bold mb-2"
            htmlFor="title"
          >
            Slug
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Image URL</label>
          <input
            type="text"
            className="border border-gray-400 p-2 w-full"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <textarea
            className="border border-gray-400 p-2 w-full"
            id="price"
            rows="2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            className="border border-gray-400 p-2 w-full"
            id="content"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
      </form>
  );
};


export default WithAuth(AdminAddProduct);






