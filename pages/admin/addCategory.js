import React, { useState } from 'react';
import Router from 'next/router';
import WithAuth from './withAuth';
import Link from 'next/link';

const AdminAddCategory = () => {
    const [category, setCategory] = useState('');
  const [slug, setSlug] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/addApi?collection=categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: category,
            slug: slug,
        })
    });
    if (res.ok) {
        Router.push('/admin');
    }
};


  return (
    <form className='p-5' onSubmit={handleSubmit}>
        <div className="flex gap-5 justify-between">
      <h1 className="text-2xl flex-1  font-bold mb-4">Add Category</h1>
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
            htmlFor="category"
          >
            Category
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
      </form>

  );
};

export default WithAuth(AdminAddCategory);





