import 'react-quill/dist/quill.snow.css'
import { useState } from 'react';
import dynamic from 'next/dynamic'
// import Quill from 'quill';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})
// const HTML = QuillNoSSRWrapper(import('formats/html'));


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
            [{ table: [] }],
            [{ 'code-block': 'code' }],
        ],
        // ['source'], 
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
        // markdownShortcuts: {},
        // imageResize: {
        //   modules: ['Resize', 'DisplaySize', 'Toolbar'],
        // },
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
        'code-block',
        'html',
    ]
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

}
