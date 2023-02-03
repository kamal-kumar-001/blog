import React from 'react';
// import Head from 'next/head';
import Link from 'next/link';
import ThemeSwitch from '../../../components/themeSwitch';

const Layout = ({children}) => {
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
      <div className="flex flex-col h-screen">
        {/* Admin Nav */}
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6 sticky top-0">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link href={"/admin"} className="font-semibold text-xl tracking-tight">
              Admin
              </Link>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <Link href="/admin/addBlog"  className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4">
                Add Blogs
              </Link>
              <Link href="/admin/addUser" className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4">
                Add Users
              </Link>
              <Link href="/admin/addCategory"  className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4">
                Add Categories
              </Link>
              <Link href="/admin/addProduct"  className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4">
                Add Product
              </Link>
              <Link href="/admin/viewContact"  className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4">
                View Contact
              </Link>
              <Link href="/admin/sendEmailToAll"  className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white mr-4">
                Send Email To All
              </Link>
              <ThemeSwitch />
            </div>
            <div>
              <Link href="/" target={"blank"}  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-sky-500 hover:bg-white mt-4 lg:mt-0">View Site
              </Link>
            </div>
          </div>
        </nav>
        {/* Content */}
        <div className="container mx-auto p-10">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;

