import React, { useState } from "react";
import Container from "./container";
import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "./themeSwitch";

export default function Navbar({categories}) {
  const navItem = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Blog",
      href: "/blog"
    },
    {
      label: "Shop",
      href: "/shop"
    },
    {
      label: "About",
      href: "/about"
    },
    {
      label: "Contact",
      href: "/contact"
    }
  ];

  const [click, setClick] = useState(false);
    const handleClick = () => {
        setClick(!click)
    }

  return (
    <header className="bg-white dark:bg-black sticky  z-20 top-0">
      
  <nav className="container mx-auto px-6 py-4">
    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
      <div className="flex md:flex-1 justify-between items-center">
        <div className="flex  items-center">
          <Link className=" text-xl font-bold md:text-2xl hover:text-gray-700" href="/">Brand</Link>
        </div>

        <div className="flex md:hidden">
          <button onClick={handleClick} type="button" className="  focus:outline-none " aria-label="toggle menu">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
            </svg>
          </button>
        </div>
      </div>
      <ThemeSwitch  />
      <div className={ click ? "md:flex items-center block" : "md:flex items-center hidden"} >
        <div className="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
        {navItem.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <span className="px-5 py-2  font-medium   hover:text-blue-500">
                        {item.label}
                      </span>
                    </Link>
                  ))}
        </div>
{/* 
        <div className="flex items-center py-2 -mx-1 md:mx-0">
          <a className="block w-1/2 px-3 py-2 mx-1 rounded text-center text-sm bg-gray-500 font-medium text-white leading-5 hover:bg-blue-600 md:mx-2 md:w-auto" href="#">Login</a>
          <a className="block w-1/2 px-3 py-2 mx-1 rounded text-center text-sm bg-blue-500 font-medium text-white leading-5 hover:bg-blue-600 md:mx-0 md:w-auto" href="#">Join free</a>
        </div> */}

        {/* <div className="mt-3 md:hidden">
          <input type="text" className="w-full px-4 py-3 leading-tight text-sm text-gray-700 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none focus:bg-white focus:shadow-outline" placeholder="Search" aria-label="Search" />
        </div> */}
      </div>
    </div>

  </nav>
    </header>
  );
}