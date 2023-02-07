import React, { useState } from 'react';
// import Layout from '../../components/AdminLayout';
import Router from 'next/router';
import WithAuth from '../../withAuth';
import Link from 'next/link';

const AdminAddUser = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [slug, setSlug] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/addApi?collection=navItems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            position: position,
            name: name,
            slug: slug,
        })
    });
    if (res.ok) {
        Router.push('/admin/pages/navbar');
    }
};


  return (
    <form className='p-5' onSubmit={handleSubmit}>
        <div className="flex gap-5 justify-between">
      <h1 className="text-2xl flex-1  font-bold mb-4">Add NavItem</h1>
      <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
           <Link href={"/admin/pages/navbar"}>Cancel</Link>
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
        htmlFor="position"
      >
        Position
      </label>
      <input
        className="border border-gray-400 p-2 w-full"
        type="text"
        id="position"
        value={position}
    onChange={(e) => setPosition(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label
        className="block font-bold mb-2"
        htmlFor="name"
      >
        Name
      </label>
      <input
        className="border border-gray-400 p-2 w-full"
        type="text"
        id="name"
        value={name}
    onChange={(e) => setName(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label
        className="block font-bold mb-2"
        htmlFor="slug"
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

export default WithAuth(AdminAddUser);
// export default AdminAddUser;






