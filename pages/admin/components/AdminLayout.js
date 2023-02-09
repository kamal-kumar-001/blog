import React, { useState } from 'react';
// import Head from 'next/head';
import Link from 'next/link';
import ThemeSwitch from '../../../components/themeSwitch';
import WithAuth from '../withAuth';

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
      <div className="flex ">
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
            
            <div className="px-10 ">
              <div className="w-full block flex-grow  lg:items-center lg:w-auto">
                <div className="  flex  flex-col  lg:flex-grow">
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
        <div className='w-4/5'>
          {children}
        </div>
      </div>
    </>
  );
};

export default WithAuth(Layout);

{/* <nav className=" rounded-md w-72 h-screen flex-col justify-between">
	<div className=" bg-white h-full">
		<div className="flex  justify-center py-10 shadow-sm pr-4">
			<svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-indigo-600" fill="none" viewBox="0 0 24 24"
				stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
			</svg>
			<div className="pl-2">

				<p className="text-2xl font-bold text-indigo-600">VENUS</p>
					<span className="text-xs block text-gray-800">DASHBOARD</span>
			</div>
		</div>
		<div className="pl-10">
			<ul className="space-y-8 pt-10">
				<li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
					</svg>
					<a href="">Dashboard</a>
				</li>
				<li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
					<a href="">Activity</a>
				</li>
				<li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
					</svg>
					<a href="">Library</a>
				</li>
				<li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
					</svg>
					<a href="">Security</a>
				</li>
				<li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
					</svg>
					<a href="">Schedules</a>
				</li>
				<li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<a href="">Payouts</a>
				</li>
				<li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
					</svg>
					<a href="">Settings</a>
				</li>
			</ul>
		</div>
	</div>
	<div className="bg-white flex items-center space-x-4 pl-10 pb-10 hover:text-indigo-600 cursor-pointer">
		<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
				d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
		</svg>
		<a href="/loguot">Logout</a>
	</div>
</nav> */}

