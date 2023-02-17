import 'react-quill/dist/quill.snow.css'
import { useState } from 'react';
import dynamic from 'next/dynamic'
// import QuillNoSSRWrapper from 'react-quill'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})


export default function RichEditor({content, setContent}) {
    const [isHTMLMode, setIsHTMLMode] = useState(false)

    const handleEditorChange = (value) => {
        if (isHTMLMode) {
          setContent(value)
        } else {
          setContent(value)
        }
      }
    
      const toggleHTMLMode = () => {
        setIsHTMLMode(!isHTMLMode)
      }

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
            [{ 'color': [] }, { 'background': [] }], 
            ['clean'],
        ],
        // ['source'], 
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }
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
        'color',
        'background',
        'source',
        'clean',
    ]
    // document.addEventListener("DOMContentLoaded", function() {
    //     const sourceButton = document.querySelector('.ql-source');
    //     if (sourceButton) {
    //       sourceButton.innerHTML = 'HTML';
    //       sourceButton.addEventListener('click', toggleHTMLMode);
    //     }
    //   });
    return(
        <div className="h-96 flex flex-col">
       <div className="flex justify-end p-2">
         <div
           onClick={toggleHTMLMode}
           className=" cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md mr-4"
         >
           {!isHTMLMode ? 'View HTML' : 'View Rich Text'}
         </div>
       </div>
       {!isHTMLMode && (
        <QuillNoSSRWrapper
          className="h-full"
          modules={modules}
          formats={formats}
          theme="snow"
          id="content"
          value={content}
          onChange={handleEditorChange}
        ></QuillNoSSRWrapper>
      )}
      {isHTMLMode && (
        <textarea
          className="h-full w-full  p-2 border border-gray-300 rounded-md"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      )}
     </div>
    )
    // return <QuillNoSSRWrapper
    //     className='h-96'
    //     modules={modules} formats={formats} theme="snow"
    //     id="content"
    //     value={content}
    //     onChange={setContent}
    //      />
}

// import { useState } from 'react';
// import 'react-quill/dist/quill.snow.css';
// import dynamic from 'next/dynamic';
// const QuillNoSSRWrapper = dynamic(import('react-quill'), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// });

// export default function RichEditor({ content, setContent }) {
//   const [isRichText, setIsRichText] = useState(true);

//   const modules = {
//     toolbar: {
//       container: [
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         ['blockquote', 'code-block'],
//         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//         [{ 'script': 'sub' }, { 'script': 'super' }],
//         [{ 'indent': '-1' }, { 'indent': '+1' }],
//         [{ 'direction': 'rtl' }, { 'align': [] }],
//         [{ 'color': [] }, { 'background': [] }],
//         ['image', 'video', 'formula'],
//         ['clean']
//       ],
//       handlers: {
//         formula: function() {
//           const range = this.quill.getSelection();
//           const value = prompt('Enter a LaTeX formula:');
//           this.quill.insertText(range.index, `$$${value}$$`, 'user');
//           this.quill.setSelection(range.index + 2, 'user');
//         }
//       }
//     },
//     imageResize: {
//       displaySize: true
//     },
//     imageDrop: true,
//     syntax: true
//   };
//   const formats = [
//     'header', 'font', 'size',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent', 'script', 'direction', 'align',
//     'color', 'background', 'link', 'image', 'video', 'formula'
//   ];

//   function toggleIsRichText() {
//     setIsRichText(!isRichText);
//   }

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="flex justify-end p-2">
//         <button
//           onClick={toggleIsRichText}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4"
//         >
//           {isRichText ? 'View HTML' : 'View Rich Text'}
//         </button>
//       </div>
//       {isRichText ? (
//         <QuillNoSSRWrapper
//           className="flex-grow"
//           modules={modules}
//           formats={formats}
//           theme="snow"
//           id="content"
//           value={content}
//           onChange={setContent}
//         />
//       ) : (
//         <div className="flex-grow p-4" dangerouslySetInnerHTML={{ __html: content }} />
//       )}
//     </div>
//   );
// }
