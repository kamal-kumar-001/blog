import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "../components/themeSwitch";
import { BiChevronDown, BiMenu } from 'react-icons/bi';
import { getNavItems } from "./api/navApi";

export default function Navbar({navItems}) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  // console.log(navItems)
  // const [dropClick, setDropClick] = useState(false);
  // const handleDrop = () => {
  //   setDropClick(!dropClick)
  // }
  const [dropClick, setDropClick] = useState({});
  // Create an object to store the state of each dropdown menu

  const handleDrop = (index) => {
    setDropClick((prevState) => {
      return { ...prevState, [index]: !prevState[index] };
    });
    // Update the state of the specific dropdown menu that was clicked
  };

  return (
    <header className="bg-white dark:bg-black sticky  z-20 top-0">
      <nav className="container mx-auto px-4 lg:px-6 py-4 lg:pb-0 md:pb-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex md:flex-1 justify-between items-center">
            <div className="flex  items-center">
              <Link className=" text-xl font-bold md:text-2xl hover:text-gray-700" href="/">Blog</Link>
            </div>

            <div className="flex md:hidden">
              <button onClick={handleClick} type="button" className="  focus:outline-none " aria-label="toggle menu">
                <BiMenu size={30}/>
              </button>
            </div>
          </div>

          <ThemeSwitch />

          <div className={click ? "md:flex items-center block" : "md:flex items-center hidden"}>
            <div className="flex flex-col md:items-center mt-2 md:flex-row md:mt-0 md:mx-1 md:space-y-0 space-y-2">
              {navItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item.subitems.length === 0 ? (
                    <Link href={item.slug}>
                      <span className="px-5 py-2 font-medium hover:text-blue-500">{item.name}</span>
                    </Link>
                  ) : (
                    <div className="cursor-pointer">
                      <div onClick={() => handleDrop(index)} className="flex justify-between px-5 md:py-3 font-medium items-center space-x-2 hover:text-blue-500">
                        <span>{item.name}</span>
                        <BiChevronDown size={24} />
                      </div>

                      {/* <ul className="bg-white dark:bg-black opacity-1 h-auto translate-y-0 transition md:absolute duration-300 md:shadow-lg md:rounded-b"> */}
                      <ul className={!dropClick[index] ? "opacity-0 h-0 -translate-y-4 overflow-hidden transition md:absolute duration-300 md:shadow-lg md:rounded-b bg-white dark:bg-black" : "bg-white dark:bg-black opacity-1 h-auto  translate-y-0   transition md:absolute  duration-300   md:shadow-lg md:rounded-b "}>
                        {item.subitems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link href={subItem.slug} className="flex px-5 py-1 hover:text-blue-500">
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
export async function getServerSideProps(context) {
            // await connectDb();
            const res = await fetch('http://localhost:3000/api/navApi');
  const data = await res.json();
  
          
            return {
              props: { 
                navItems: data.navItems ,
              },
              
            }
          }



// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import ThemeSwitch from "../components/themeSwitch";
// import { BiChevronDown, BiMenu } from "react-icons/bi";

// export default function Navbar({navItems}) {
//   // const [navItems, setNavItems] = useState([]);

//   // useEffect(() => {
//   //   const fetchNavItems = async () => {
//   //     const res = await fetch("api/navApi");
//   //     const data = await res.json();
//   //     setNavItems(data);
//   //   };

//   //   fetchNavItems();
//   // }, []);

//   const [click, setClick] = useState(false);
//   const handleClick = () => {
//     setClick(!click);
//   };

//   return (
//     <header className="bg-white dark:bg-black sticky z-20 top-0">
//       <nav className="container mx-auto px-4 lg:px-6 py-4 lg:pb-0 md:pb-0">
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center">
//           <div className="flex md:flex-1 justify-between items-center">
//             <div className="flex items-center">
//               <Link
//                 className="text-xl font-bold md:text-2xl hover:text-gray-700"
//                 href="/"
//               >
//                 Blog
//               </Link>
//             </div>

//             <div className="flex md:hidden">
//               <button
//                 onClick={handleClick}
//                 type="button"
//                 className="focus:outline-none"
//                 aria-label="toggle menu"
//               >
//                 <BiMenu size={30} />
//               </button>
//             </div>
//           </div>
//           <ThemeSwitch />
//           <div className={click ? "md:flex items-center block" : "md:flex items-center hidden"}>
//             <div className="flex flex-col md:items-center mt-2 md:flex-row md:mt-0 md:mx-1 md:space-y-0 space-y-2">
//               {navItems.map((item) => (
//                 <NavItem key={item.id} item={item} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

// function NavItem({ item }) {
//   const [subNavOpen, setSubNavOpen] = useState(false);

//   const handleSubNavClick = () => {
//     setSubNavOpen(!subNavOpen);
//   };

//   if (item.subNavItems.length === 0) {
//     return (
//       <Link href={item.link}>
//         <span className="px-5 py-2 font-medium hover:text-blue-500">{item.label}</span>
//       </Link>
//     );
//   } else {
//     return (
//       <div onClick={handleSubNavClick} className="cursor-pointer">
//         <div className="hover:text-blue-500 flex justify-between px-5 md:py-3 font-medium items-center space-x-2">
//           <span>{item.label}</span>
//           <BiChevronDown size={24} />
//         </div>
//         <ul
//           className={
//             !subNavOpen
//               ? "opacity-0 h-0 -translate-y-4 overflow-hidden transition md:absolute duration-300 md:shadow-lg md:rounded-b bg-white dark:bg-black"
//               : "bg-white dark:bg-black opacity-1 h-auto translate-y-0 transition md:absolute duration-300 md:shadow-lg md:rounded-b"
//           }
//         >
//           {item.subNavItems.map((subNavItem) => (
//             <Link key={subNavItem.id} href={subNavItem.link}>
//               {subNavItem.name}
//             </Link>
//             ))}
//             </ul>
//             </div>
//     )
//           }
//         }
//         export async function getServerSideProps(context) {
//           await connectDb();
//           let  = await Product.find()
        
//           return {
//             props: { 
//               navItems ,
//             },
            
//           }
//         }