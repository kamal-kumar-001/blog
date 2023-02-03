// import React, { useState } from 'react';
// // import Layout from './components/AdminLayout';
// // import Blog from '../../models/Blog';
import User from '../../models/User';
import Category from '../../models/Category';
// import Router from 'next/router';
import mongoose from 'mongoose'
// import WithAuth from './withAuth';
// import Link from 'next/link';
// // import RichEditor from './components/richEditor';
// import 'react-quill/dist/quill.snow.css'
// import dynamic from 'next/dynamic'
import WithAuth from './withAuth';
import BlogForm from "./components/BlogForm";

// const RichEditor = dynamic(import('react-quill'), {	
//     ssr: false,
//     loading: () => <p>Loading ...</p>,
//     })


// const AdminAddBlog = ({ categories, users }) => {
//   const [title, setTitle] = useState('');
//   const [slug, setSlug] = useState('');
//   const [img, setImg] = useState('');
//   const [content, setContent] = useState('');
//   const [category, setCategory] = useState('');
//   const [user, setUser] = useState('');
//   const [metaContent, setMetaContent] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch('/api/addBlog', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             title: title,
//             slug: slug,
//             content: content,
//             metaContent: metaContent,
//             category: category,
//             user: user,
//             img: img,
//         })
//     });
//     if (res.ok) {
//         Router.push('/admin');
//     }
// };


//   return (
//     <form className='p-5' onSubmit={handleSubmit}>
//         <div className="flex gap-5 justify-between">
//       <h1 className="text-2xl flex-1  font-bold mb-4">Add Blog</h1>
//       <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
//         >
//            <Link href={"/admin"}>Cancel</Link>
//         </button>
//       <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
//           type="submit"
//         >
//           Save
//         </button>
//         </div>
//         <div className="mb-4">
//           <label
//             className="block font-bold mb-2"
//             htmlFor="title"
//           >
//             Title
//           </label>
//           <input
//             className="border border-gray-400 p-2 w-full"
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block font-bold mb-2"
//             htmlFor="title"
//           >
//             Slug
//           </label>
//           <input
//             className="border border-gray-400 p-2 w-full"
//             type="text"
//             id="slug"
//             value={slug}
//             onChange={(e) => setSlug(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-bold mb-2">Image URL</label>
//           <input
//             type="text"
//             className="border border-gray-400 p-2 w-full"
//             value={img}
//             onChange={(e) => setImg(e.target.value)}
//           />
//         </div>
//         <div className="mb-5">
//           <label className="block font-bold mb-2">Category</label>
//           <select
//             className="border border-gray-400 p-2 w-full"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Select Category</option>
//             {categories.map((c) => (
//               <option key={c._id} value={c._id}>
//                 {c.name}</option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block font-bold mb-2">User</label>
//           <select
//             className="border border-gray-400 p-2 w-full"
//             value={user}
//             onChange={(e) => setUser(e.target.value)}
//           >
//             <option value="">Select User</option>
//             {users.map((u) => (
//             <option key={u._id} value={u._id}>
//               {u.name}
//             </option>
//             ))}

//           </select>
//         </div>

//         <div className="mb-4">
//           <label
//             className="block font-bold mb-2"
//             htmlFor="metaContent"
//           >
//             MetaContent
//           </label>
//           <textarea
//             className="border border-gray-400 p-2 w-full"
//             id="metaContent"
//             rows="2"
//             value={metaContent}
//             onChange={(e) => setMetaContent(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block font-bold mb-2"
//             htmlFor="content"
//           >
//             Content
//           </label>
//           {/* <textarea
//             className="border border-gray-400 p-2 w-full"
//             id="content"
//             rows="8"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//           /> */}
//           <RichEditor 
//           id="content"
//           rows="8"
//           value={content}
//           onChange={setContent}
//           // onChange={(e) => setContent(e.target.value)}
//           required
//           />
//         </div>
//       </form>
//   );
// };
// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URL)
//   }

//   let categories = await Category.find();
//   let user = await User.find();
//   return {
//     props: {
//       categories: JSON.parse(JSON.stringify(categories)),
//       users: JSON.parse(JSON.stringify(user)),
//     },
//   }
// }

// export default WithAuth(AdminAddBlog);

const AdminAddBlog = ({ categories, users }) => {
  return <BlogForm initialValues={{}} mode="add" categories={categories} users={users}/>;
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL)
  }

  let categories = await Category.find();
  let user = await User.find();
  // console.log(categories)
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      users: JSON.parse(JSON.stringify(user)),
    },
  }
}
export default WithAuth(AdminAddBlog);




