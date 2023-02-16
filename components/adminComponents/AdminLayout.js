import React, { useState } from 'react';
// import Head from 'next/head';
import Link from 'next/link';
import ThemeSwitch from '../themeSwitch';
// import WithAuth from '../pages/admin/withAuth';

const Layout = ({ children }) => {
//   const [click, setClick] = useState(false);
//   const handleDrop = () => {
//     setClick(!click)
//   }
  return (
    <>
      <style jsx global>{`
      .footer{
        display: none;
      }
      .main-nav{
        display: none;
      }
      `}
      </style>
      <div className="flex justify-between ">
        {/* Admin Nav */}

        <nav className=" rounded-md w-1/5 h-screen flex-col justify-between">
          <div className=" border-r-2 fixed top-0 left-0 h-full">
            <div className="flex  justify-center py-10 shadow-sm pr-4">
              <div className="pl-2">
                <Link href={"/admin"}>
                  <p className="text-2xl font-bold  ">Admin</p>
                  <span className="text-xs block ">DASHBOARD</span>
                </Link>
              </div>
            </div>
            
            <div className=" ">
              <div className="w-full block flex-grow  lg:items-center lg:w-auto">
                <div className="px-10  ml-5  flex  flex-col  lg:flex-grow">
                  <Link href="/" target={"blank"} className=" mt-4 ">
                    View Site
                  </Link>
                  <Link href="/admin/pages/navbar" className=" mt-4 ">
                    Navbar
                  </Link>
                  <Link href="/admin/pages/blogs" className=" mt-4 ">
                    Blogs
                  </Link>
                  <Link href="/admin/pages/pages" className=" mt-4 ">
                    Pages
                  </Link>
                  <Link href="/admin/pages/categories" className=" mt-4 ">
                    Categories
                  </Link>
                  <Link href="/admin/pages/contacts" className=" mt-4 ">
                    Contacts
                  </Link>
                  <Link href="/admin/pages/products" className=" mt-4 ">
                    Products
                  </Link>
                  <Link href="/admin/pages/users" className=" mt-4 ">
                    Users
                  </Link>
                  <Link href="/admin/pages/newsLetter" className=" mt-4 ">
                    News Letter
                  </Link>
                </div>
              </div>
            </div>
            <div className="bottom-3 fixed mx-5">
              <ThemeSwitch />
            </div>
          </div>

        </nav>
        {/* Content */}
        <div className='w-4/5 '>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
// export default WithAuth(Layout);