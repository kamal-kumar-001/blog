import React, { useState } from 'react';
import Router from 'next/router';
import WithAuth from '../withAuth';
import Link from 'next/link';
import axios from 'axios';

const UpdateNav = ({navItem}) => {
  const [position, setPosition] = useState(navItem.position);
  const [name, setName] = useState(navItem.name);
  const [slug, setSlug] = useState(navItem.slug);
  const [subitems, setSubitems] = useState(navItem.subitems);
  const length = navItem.subitems.length;
  const [subitemForms, setSubitemForms] = useState(Array.from({ length }, () => 1));

  const handleAddSubitemForm = () => {
    const newId = Date.now();
    setSubitemForms([...subitemForms, { id: newId }]);
    setSubitems([...subitems, { id: newId, name: '', slug: '' }]);
  };

const handleDeleteSubitemForm = (id) => {
    const index = subitems.findIndex((subitem) => subitem.id === id);
    setSubitems((prevSubitems) => {
      const newSubitems = [...prevSubitems];
      newSubitems.splice(index, 1);
      return newSubitems;
    });
  
    setSubitemForms((prevForms) => {
      const newForms = [...prevForms];
      newForms.splice(index, 1);
      return newForms;
    });
  };

  const handleSubitemNameChange = (index, value) => {
    setSubitems((prevSubitems) =>
      prevSubitems.map((subitem, i) =>
        i === index ? { ...subitem, name: value } : subitem
      )
    );
  };

  const handleSubitemSlugChange = (index, value) => {
    setSubitems((prevSubitems) =>
      prevSubitems.map((subitem, i) =>
        i === index ? { ...subitem, slug: value } : subitem
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/navApi?id=${navItem._id}`, {_id: navItem._id,position, name, slug, subitems });
      console.log(response.message);
      Router.push('/admin/pages/navbar');

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Update NavItem</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="position" className="block font-medium">
            Position
          </label>
          <input
            type="number"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="form-input px-3 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input px-3 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="slug" className="block font-medium">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="form-input px-3 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Update Nav
          </button>
        </div>
        {subitemForms.map((form, index) => (
  <div key={index} className="mb-4">
    <h2 className="font-medium mb-2">Subitem {index + 1}</h2>
    <div className="mb-2">
      <label htmlFor={`subitem-name-${index}`} className="block">
        Name
      </label>
      <input
        type="text"
        id={`subitem-name-${index}`}
        value={subitems[index]?.name || ''}
        onChange={(e) => handleSubitemNameChange(index, e.target.value)}
        className="form-input px-3 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div className="mb-2">
      <label htmlFor={`subitem-slug-${index}`} className="block">
        Slug
      </label>
      <input
        type="text"
        id={`subitem-slug-${index}`}
        value={subitems[index]?.slug || ''}
        onChange={(e) => handleSubitemSlugChange(index, e.target.value)}
        className="form-input px-3 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <button
      type="button"
      className="bg-red-500 text-white py-2 px-4 rounded"
    // onClick={handleDeleteSubitemForm}
    onClick={() => handleDeleteSubitemForm(subitemForms[index].id)}
    >
      Delete Subitem
    </button>
  </div>
))}
<button
  type="button"
  className="bg-blue-500 text-white py-2 px-4 rounded"
  onClick={handleAddSubitemForm}
>
  Add Subitem
</button>
</form>
</div>
  )
};
export async function getServerSideProps({ params }) {
  const { slug } = params;
  // const baseUrl = process.env.URL;
  let baseUrl = 'https://blog-jcxn.vercel.app/'
  const res = await fetch(`${baseUrl}/api/nav/${slug}`);
  const nav = await res.json();

  return {
    props: {
      navItem: nav,
    },
  };
}

export default WithAuth(UpdateNav)
