// import { useTheme } from "next-themes";
// import { BiSun } from "react-icons/bi";

// const ThemeSwitch = () => {

//   const { theme, setTheme } = useTheme();


//   return (
//     <>
//       <style jsx global>
//         {`
//         .switch {
//           font-size: 17px;
//           position: relative;
//           display: inline-block;
//           width: 3.5em;
//           height: 2em;
//         }
        
//         .switch input {
//           opacity: 0;
//           width: 0;
//           height: 0;
//         }
        
//         .slider {
//           --background: #28096b;
//           position: absolute;
//           cursor: pointer;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: var(--background);
//           -webkit-transition: .5s;
//           transition: .5s;
//           border-radius: 30px;
//         }
        
//         .slider:before {
//           position: absolute;
//           content: "";
//           height: 1.4em;
//           width: 1.4em;
//           border-radius: 50%;
//           left: 10%;
//           bottom: 15%;
//           -webkit-box-shadow: inset 8px -4px 0px 0px #fff000;
//                   box-shadow: inset 8px -4px 0px 0px #fff000;
//           background: var(--background);
//           -webkit-transition: .5s;
//           transition: .5s;
//         }
        
//         input:checked + .slider {
//           background-color: #522ba7;
//         }
        
//         input:checked + .slider:before {
//           -webkit-transform: translateX(100%);
//               -ms-transform: translateX(100%);
//                   transform: translateX(100%);
//           -webkit-box-shadow: inset 15px -4px 0px 15px #fff000;
//                   box-shadow: inset 15px -4px 0px 15px #fff000;
//         }
//         `}
//       </style>
//     <div className="md:inline-flex hidden items-center">
//       <BiSun className="w-4 h-4 mr-2" />
//       <select value={theme} onChange={e => setTheme(e.target.value)}>
//         <option value="system">System</option>
//         <option value="dark">Dark</option>
//         <option value="light">Light</option>
//       </select>
//     </div>
//     </>
//   );
// };

// export default ThemeSwitch;

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {IoMdMoon,IoMdSunny } from 'react-icons/io';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="md:inline-flex  items-center">
      
      <label className="flex items-center cursor-pointer">
        <div className={`relative w-10 h-5 transition duration-200 ease-linear rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className={`absolute w-5 h-5 transition duration-200 ease-in-out transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}  bg-gray-200 dark:bg-gray-800 rounded-full shadow`}>{!isDarkMode ? <IoMdSunny  size={20} /> : <IoMdMoon  size={20} />}</div>
          <input
            type="checkbox"
            className="hidden"
            checked={isDarkMode}
            onChange={handleToggle}
          />
        </div>
        {/* <div className="ml-3 text-gray-700 font-medium">{isDarkMode ? 'Dark' : 'Light'}</div> */}
      </label>
    </div>
  );
};

export default ThemeSwitch;
