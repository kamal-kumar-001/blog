import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "./themeSwitch";
import {BiChevronDown,BiMenu} from 'react-icons/bi'
// import { useSession, signIn, signOut } from "next-auth/react"

export default function Navbar({ navItems }) {

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click)
  }
  const [dropClick, setDropClick] = useState(false);
  const handleDrop = () => {
    setDropClick(!dropClick)
  }

  // const { data: session } = useSession()
  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // }

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
          <div className={click ? "md:flex items-center block" : "md:flex items-center hidden"} >
            <div className="flex flex-col md:items-center mt-2 md:flex-row md:mt-0 md:mx-1 md:space-y-0 space-y-2">
              {/* {navItem.map((item, index) => ( */}
              <Link href={"/"} >
                <span className="px-5 py-2  font-medium   hover:text-blue-500">
                  Home
                </span>
              </Link>
              <div onClick={handleDrop} className="cursor-pointer ">
                <div className="hover:text-blue-500 flex justify-between px-5 md:py-3 font-medium   items-center  space-x-2">
                  <span>Service</span>
                  <BiChevronDown size={24}/>
                </div>
                <ul className={!dropClick ? "opacity-0 h-0 -translate-y-4 overflow-hidden  transition md:absolute  duration-300    md:shadow-lg md:rounded-b bg-white dark:bg-black" : "bg-white dark:bg-black opacity-1 h-auto  translate-y-0   transition md:absolute  duration-300   md:shadow-lg md:rounded-b "} >
                  <li>
                    <Link href={"/services/web-development"} className="flex px-5 py-1 hover:text-blue-500">
                      Web development
                    </Link>
                  </li>
                  <li>
                    <Link href={"/services/web-design"} className="flex px-5 py-1 hover:text-blue-500">
                      Web Design
                    </Link>
                  </li>
                  <li>
                    <Link href={"/services/email-marketing"} className="flex px-5 py-1 hover:text-blue-500">
                      Email Marketing
                    </Link>
                  </li>
                </ul>
              </div>
              <Link href={"/blog"} >
                <span className="px-5 py-2  font-medium   hover:text-blue-500">
                  Blog
                </span>
              </Link>
              <Link href={"/shop"} >
                <span className="px-5 py-2  font-medium   hover:text-blue-500">
                  Shop
                </span>
              </Link>
              <Link href={"/contact"} >
                <span className="px-5 py-2  font-medium   hover:text-blue-500">
                  Contact
                </span>
              </Link>
              <Link href={"/about"} >
                <span className="px-5 py-2  font-medium   hover:text-blue-500">
                  About
                </span>
              </Link>
              {/* ))} */}
            </div>
            
        <div className="flex items-center py-2 -mx-1 md:mx-0">
        {/* <button className="block w-1/2 px-3 py-2 mx-1 rounded text-center text-sm bg-gray-500 font-medium text-white leading-5 hover:bg-blue-600 md:mx-2 md:w-auto" onClick={() => signIn()}>Login</button> */}
        {/* <button className="block w-1/2 px-3 py-2 mx-1 rounded text-center text-sm bg-gray-500 font-medium text-white leading-5 hover:bg-blue-600 md:mx-2 md:w-auto" onClick={() => signUp()}>Sign Up</button> */}
          {/* <a className="block w-1/2 px-3 py-2 mx-1 rounded text-center text-sm bg-gray-500 font-medium text-white leading-5 hover:bg-blue-600 md:mx-2 md:w-auto" href="#">Login</a> */}
          {/* <a className="block w-1/2 px-3 py-2 mx-1 rounded text-center text-sm bg-blue-500 font-medium text-white leading-5 hover:bg-blue-600 md:mx-0 md:w-auto" href="#">Join free</a> */}
        </div>

            {/* <div className="mt-3 md:hidden">
          <input type="text" className="w-full px-4 py-3 leading-tight text-sm text-gray-700 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none focus:bg-white focus:shadow-outline" placeholder="Search" aria-label="Search" />
        </div> */}
          </div>
        </div>

      </nav>
    </header>
  );
}

// import React from 'react'

// const Navbar = ({navItems}) => {
//   let dropdownItems = [];
//   return (
//     <div className="navbar">
//       {navItems.map((item, index) => {
//         if (item.name.startsWith('--')) {
//           // This is a dropdown item
//           dropdownItems.push(item);
//           return null;
//         }

//         const isFirstItem = dropdownItems.length === 0;

//         const renderedItem = (
//           <Link key={item.slug} href={item.slug}>
//             <span className="nav-link">{item.name}</span>
//           </Link>
//         );

//         if (isFirstItem) {
//           // This item is the first after a dropdown, so it's the dropdown trigger
//           const dropdownMenu = (
//             <div className="dropdown-menu">
//               {dropdownItems.map((dropdownItem, dropdownIndex) => (
//                 <Link key={dropdownItem.slug} href={dropdownItem.slug}>
//                   <span className="dropdown-link">{dropdownItem.name.slice(2)}</span>
//                 </Link>
//               ))}
//             </div>
//           );

//           dropdownItems = [];
//           return (
//             <div key={item.slug} className="dropdown">
//               {renderedItem}
//               {dropdownMenu}
//             </div>
//           );
//         }

//         return renderedItem;
//       })}
//     </div>
//   )
// }
// export async function getStaticProps() {
//   // Fetch the navigation menu data from the API endpoint
//   const res = await fetch('http://localhost:3000/api/getApi');
//   const navItems = await res.json();
//   console.log(navItems);
//   // Pass the navigation menu data as a prop to the page component
//   return {
//     props: { navItems },
//   };
// }

// export default Navbar
