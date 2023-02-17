import { useState } from 'react';
import axios from 'axios';

const AddNavItemPage = () => {
  const [position, setPosition] = useState('');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [subitems, setSubitems] = useState([]);
  const [subitemForms, setSubitemForms] = useState([]);

//   const handleAddSubitemForm = () => {
//     setSubitemForms([...subitemForms, {}]);
//     setSubitems([...subitems, { name: '', slug: '' }]);
//   };

const handleAddSubitemForm = () => {
    const newId = Date.now();
    setSubitemForms([...subitemForms, { id: newId }]);
    setSubitems([...subitems, { id: newId, name: '', slug: '' }]);
  };

//   const handleDeleteSubitemForm = (index) => {
//     setSubitemForms((prevForms) => {
//       const newForms = [...prevForms];
//       newForms.splice(index, 1);
//       return newForms;
//     });

//     setSubitems((prevSubitems) => {
//       const newSubitems = [...prevSubitems];
//       newSubitems.splice(index, 1);
//       return newSubitems;
//     });
//   };

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

    const newNavItem = {position, name, slug, subitems };
    console.log(newNavItem);
    try {
      const response = await axios.post('/api/navApi', newNavItem);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Add NavItem</h1>
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
            // onClick={handleAddSubitemForm}
          >
            Add Nav
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

)}
export default AddNavItemPage;


// import { useState } from 'react';
// import axios from 'axios';

// const AddNavItemPage = () => {
//   const [name, setName] = useState('');
//   const [slug, setSlug] = useState('');
//   const [subitems, setSubitems] = useState([]);
//   const [subitemForms, setSubitemForms] = useState([]);

//   const handleAddSubitemForm = () => {
//     setSubitemForms([...subitemForms, {}]);
//   };

//   const handleSubitemNameChange = (index, value) => {
//     setSubitems((prevSubitems) =>
//       prevSubitems.map((subitem, i) =>
//         i === index ? { ...subitem, name: value } : subitem
//       )
//     );
//   };

//   const handleSubitemSlugChange = (index, value) => {
//     setSubitems((prevSubitems) =>
//       prevSubitems.map((subitem, i) =>
//         i === index ? { ...subitem, slug: value } : subitem
//       )
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newNavItem = { name, slug, subitems };

//     try {
//       const response = await axios.post('/api/navApi', newNavItem);
//       console.log(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto my-8">
//       <h1 className="text-2xl font-bold mb-4">Add NavItem</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="name" className="block font-medium">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="form-input  mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="slug" className="block font-medium">
//             Slug
//           </label>
//           <input
//             type="text"
//             id="slug"
//             value={slug}
//             onChange={(e) => setSlug(e.target.value)}
//             className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <button
//             type="button"
//             className="bg-blue-500 text-white py-2 px-4 rounded"
//             onClick={handleAddSubitemForm}
//           >
//             Add Subitem
//           </button>
//         </div>
//         {subitemForms.map((form, index) => (
//           <div key={index} className="mb-4">
//             <h2 className="font-medium mb-2">Subitem {index + 1}</h2>
//             <div className="mb-2">
//               <label htmlFor={`subitem-name-${index}`} className="block">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id={`subitem-name-${index}`}
//                 value={subitems[index]?.name || ''}
//                 onChange={(e) => handleSubitemNameChange(index, e.target.value)}
//                 className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>
//             <div className="mb-2">
//               <label htmlFor={`subitem-slug-${index}`} className="block">
//                 Slug
//               </label>
//               <input
//                 type="text"
//                 id={`subitem-slug-${index}`}
//                 value={subitems[index]?.slug || ''}
//                 onChange={(e) => handleSubitemSlugChange(index, e.target.value)}
//                 className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>

//           </div>
//         ))}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded"
//         >
//           Add NavItem
//         </button>
//       </form>
//     </div>
//     );
// };

// export default AddNavItemPage;