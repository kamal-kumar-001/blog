import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import RichEditor from './RichEditor';

const PageForm = ({mode, page, initialValues}) => {
    const [title, setTitle] = useState(initialValues.title || '');
    const [content, setContent] = useState(initialValues.content || '');
    const [slug, setSlug] = useState(initialValues.slug || '');
    const [desc, setDesc] = useState(initialValues.desc || '');
  
   
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (mode === 'add') {
        const res = await fetch('/api/addApi?collection=pages', {
          method : 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              title: title,
              slug: slug,
              content: content,
              desc: desc,
          })
      });
      if (res.ok) {
        
        Router.push('/admin/pages/pages');
      }
      } else if (mode === 'update') {
        const res = await fetch(`/api/updateApi?collection=pages`, {
          method : 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
             _id: page._id,
             title: title,
             slug: slug,
             content: content,
             desc: desc,
          })
      });
      if (res.ok) {
        
        Router.push('/admin/pages/pages');
      }
      }
  
    };
    return (
        <form className='p-5' onSubmit={handleSubmit}>
        <div className="flex gap-5 justify-between items-center">
      <h1 className="text-2xl flex-1  font-bold mb-4">{mode} Page</h1>
           <Link href={"/admin/pages/pages"} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded" >Cancel</Link>
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
          <label
            className="block font-bold mb-2"
            htmlFor="desc"
          >
            Description
          </label>
          <textarea
            className="border border-gray-400 p-2 w-full"
            id="desc"
            rows="2"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
          <RichEditor content={content} setContent={setContent} />
        </div>
      </form>
    );
  };

  export default PageForm;