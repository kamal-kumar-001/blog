import React, { useState } from 'react';
import Router from 'next/router';
import WithAuth from '../../withAuth';
import Link from 'next/link';

const AdminAddUser = () => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [email, setEmail] = useState('');
  // const [isAdmin, setIsAdmin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/addApi?collection=users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            img: img,
            // isAdmin: isAdmin,
            password: password,
        })
    });
    if (res.ok) {
        Router.push('/admin/pages/users');
    }
};


  return (
    <form className='p-5' onSubmit={handleSubmit}>
        <div className="flex gap-5 justify-between">
      <h1 className="text-2xl flex-1  font-bold mb-4">Add User</h1>
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
        htmlFor="email"
      >
        Email
      </label>
      <input
        className="border border-gray-400 p-2 w-full"
        type="email"
        id="email"
        value={email}
    onChange={(e) => setEmail(e.target.value)}
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
      <label className="block font-bold mb-2">Password</label>
      <input
        type="text"
        className="border border-gray-400 p-2 w-full"
        value={password}
    onChange={(e) => setPassword(e.target.value)}
      />
    </div>

  </form>
  );
};

export default WithAuth(AdminAddUser);
// export default AdminAddUser;






