import Link from 'next/link'
import React from 'react'

const Portfolio = () => {
  return (
    <div className=" body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 ">Our Portfolio</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom.</p>
    </div>
    <div className="flex flex-wrap -m-4">
      {/* <div className="lg:w-1/3 sm:w-1/2  p-4">
        <div className="flex relative">
          <img alt="gallery" className="absolute inset-0 w-full h-full object-cover object-center" src="https://dummyimage.com/600x360" />
          <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white dark:bg-black opacity-0 hover:opacity-100">
            <h2 className="tracking-widest text-sm title-font font-medium text-blue-500 mb-1">THE SUBTITLE</h2>
            <h1 className="title-font text-lg font-medium  mb-3">Shooting Stars</h1>
            <p className="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
          </div>
        </div>
      </div> */}
      <div className="lg:w-1/3 sm:w-1/2  p-4">
        <div className="flex relative">
          
          <iframe alt="gallery" className="absolute inset-0 w-full h-full object-cover object-center" src="https://kamal-001.github.io" />
          <div className="px-8 py-10 relative z-10 w-full h-full border-4 border-gray-200 bg-white dark:bg-black  opacity-0 hover:opacity-100">
            <h2 className="tracking-widest text-sm title-font font-medium text-blue-500 mb-1">Personal Portfolio Site</h2>
            <h1 className="title-font text-lg font-medium  mb-3">Portfolio site for a <br/> Web Developer</h1>
            {/* <p className="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p> */}
            <Link href='https://kamal-001.github.io'>
                    <button className=" py-2 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none   focus:ring-gray-200 px-5 dark:bg-white dark:text-black ">
                      View Site
                    </button>
                  </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Portfolio