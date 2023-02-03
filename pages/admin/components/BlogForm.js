import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'

const RichEditor = dynamic(import('react-quill'), {	
    ssr: false,
    loading: () => <p>Loading ...</p>,
    })



const BlogForm = ({mode, categories, users, initialValues}) => {
    const [title, setTitle] = useState(initialValues.title || '');
    const [content, setContent] = useState(initialValues.content || '');
    const [slug, setSlug] = useState(initialValues.slug || '');
    const [img, setImg] = useState(initialValues.img || '');
    const [category, setCategory] = useState(initialValues.category || '');
    const [user, setUser] = useState(initialValues.user || '');
    const [metaContent, setMetaContent] = useState(initialValues.metaContent || '');
  
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = '';
    let method = '';
    if (mode === 'add') {
      url = '/api/addApi?collection=blogs';
      method = 'POST';
    } else if (mode === 'update') {
      url = '/api/updateBlog';
      method = 'POST';
    }

    const res = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            slug: slug,
            content: content,
            metaContent: metaContent,
            category: category,
            user: user,
            img: img,
        })
    });
    if (res.ok) {
        Router.push('/admin');
    }
  };
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]
    return (
        <form className='p-5' onSubmit={handleSubmit}>
        <div className="flex gap-5 justify-between items-center">
      <h1 className="text-2xl flex-1  font-bold mb-4">{mode} Blog</h1>
           <Link href={"/admin"} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded" >Cancel</Link>
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
        <div className="mb-5">
          <label className="block font-bold mb-2">Category</label>
          <select
            className="border border-gray-400 p-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories && categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">User</label>
          <select
            className="border border-gray-400 p-2 w-full"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          >
            <option value="">Select User</option>
            {users && users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
            ))}

          </select>
        </div>

        <div className="mb-4">
          <label
            className="block font-bold mb-2"
            htmlFor="metaContent"
          >
            MetaContent
          </label>
          <textarea
            className="border border-gray-400 p-2 w-full"
            id="metaContent"
            rows="2"
            value={metaContent}
            onChange={(e) => setMetaContent(e.target.value)}
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
          {/* <textarea
            className="border border-gray-400 p-2 w-full"
            id="content"
            rows="8"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          /> */}
          <RichEditor 
          className=' h-96'
           modules={modules} formats={formats} theme="snow"
          id="content"
          value={content}
          onChange={setContent}
          // onChange={(e) => setContent(e.target.value)}
          required
          />
        </div>
      </form>
    );
  };

  export default BlogForm;