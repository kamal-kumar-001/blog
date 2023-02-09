import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'

const RichEditor = dynamic(import('react-quill'), {	
    ssr: false,
    loading: () => <p>Loading ...</p>,
    })



const PageForm = ({mode, categories, users, initialValues}) => {
    const [title, setTitle] = useState(initialValues.title || '');
    const [content, setContent] = useState(initialValues.content || '');
    const [slug, setSlug] = useState(initialValues.slug || '');
    const [desc, setDesc] = useState(initialValues.desc || '');
  
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = '';
    let method = '';
    if (mode === 'add') {
      url = '/api/addApi?collection=pages';
      method = 'POST';
    } else if (mode === 'update') {
      url = '/api/updatePage';
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
            desc: desc,
        })
    });
    if (res.ok) {
      
        Router.push('/admin');
    }
  };
  // const handleFileChange = (e) => {
  //   setImg(e.target.files[0]);
  // };
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
          <RichEditor 
          className=' h-96'
           modules={modules} formats={formats} theme="snow"
          id="content"
          value={content}
          onChange={setContent}
          required
          />
        </div>
      </form>
    );
  };

  export default PageForm;