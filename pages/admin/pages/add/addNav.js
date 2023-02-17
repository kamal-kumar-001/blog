import React, { useState } from 'react';
import Router from 'next/router';
import WithAuth from '../../withAuth';
import Link from 'next/link';

const AdminAddNav = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [slug, setSlug] = useState('');
  const [subnavItems, setSubNavItems] = useState([]);

  const handleSubnavItemChange = (e, index, key) => {
    const { value } = e.target;
    const items = [...subnavItems];
    items[index][key] = value;
    setSubNavItems(items);
  };
  
  const handleSubnavItemDelete = (index) => {
    const items = [...subnavItems];
    items.splice(index, 1);
    setSubNavItems(items);
  };
  


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
        subnavItems: subnavItems
      })
    });
    
    if (res.ok) {
      Router.push('/admin/pages/navbar');
    }
  };
  console.log(subnavItems)
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
      <div className="mb-4">
  <label className="block font-bold mb-2">Subnav Items</label>
  <button onClick={() => setSubNavItems([...subnavItems, { name: '', slug: '' }])}>Add Subnav Item</button>
  {subnavItems.map((item, index) => (
    <div key={index}>
      <label className="block font-bold mb-2">Subnav Item {index + 1}</label>
      <input className="border border-gray-400 p-2 w-full" type="text" value={item.name} onChange={(e) => handleSubnavItemChange(e, index, 'name')} required />
      <input className="border border-gray-400 p-2 w-full" type="text" value={item.slug} onChange={(e) => handleSubnavItemChange(e, index, 'slug')} required />
      <button onClick={() => handleSubnavItemDelete(index)}>Remove Subnav Item</button>
    </div>
  ))}
</div>
</form>
  )
};
export default WithAuth(AdminAddNav)
