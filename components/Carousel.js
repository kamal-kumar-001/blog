import Link from 'next/link';
import React from 'react'

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1)
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <>
    {/* <style jsx global>
      {`
      .bgImage{
        background-image: url(`${item.bgImage}`);
      }`}
    </style> */}
    <div className="relative w-full h-[33rem] md:h-96 lg:h-96">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-gray-200 dark:bg-gray-900 "></div>
      </div>
      <div className="">
        <div className="relative w-full h-full">
          {items.map((item, index) => (
            <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${activeIndex === index ? "" : "hidden"}`}
            // style={{ background: `url(${item.bgImage})` }}
          >
             <div 
            //  style={{ background: `url(${item.bgImage})`  }}
              className='absolute gap-10 flex flex-wrap-reverse items-center justify-evenly top-1/2'>
                <div className='w-3/4 md:w-1/3 lg:w-1/3'>
                  <h2 className="text-3xl font-bold mb-4 ">{item.title}</h2>
                  <p className='mb-4'>{item.text}</p>
                  <Link href={item.link}>
                    <button className=" py-2 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none   focus:ring-gray-200 px-5 dark:bg-white dark:text-black ">
                      {item.buttonName}
                    </button>
                  </Link>
                </div>
                <div className='w-3/4 md:w-1/4 lg:w-1/4 overflow-hidden'>
                  <img className='md:h-96 h-60 object-contain object-center' src={item.bgImage} alt={item.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 md:left-2 lg:left-2">
          <button
            onClick={handlePrev}
            className=" rounded-full h-10 w-10 flex items-center justify-center focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-0 md:right-2 lg:right-2">
          <button
            onClick={handleNext}
            className=" rounded-full h-10 w-10 flex items-center justify-center focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 flex justify-center mb-4">
        {items.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 mx-2 rounded-full cursor-pointer transition-all ${activeIndex === index
              ? "bg-gray-400 hover:bg-gray-800"
              : "bg-white hover:bg-gray-800"
              }`}
            onClick={() => setActiveIndex(index)}
          ></div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Carousel




            //   <div   className="relative inset-0 rounded-lg block md:flex items-center  "  >
            //   <div className="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg min-h-[19]" >
            //     <img className="absolute inset-0 w-full h-full object-cover object-center" src={item.bgImage} alt={item.title} />
            //     <div className="absolute inset-0 w-full h-full bg-indigo-900 opacity-75"></div>
            //     <div className="absolute inset-0 w-full h-full flex items-center justify-center fill-current text-white">
            //       Blogs
            //     </div>
            //   </div>
            //   <div className="w-full md:w-3/5 h-full flex items-center  rounded-lg min-h-[19]">
            //     <div className=" flex flex-col justify-center ">
            //       <h2 className="text-3xl font-bold mb-4 ">{item.title}</h2>
            //       <p className="text-gray-600">{item.text}</p>
            //       <Link href={item.link}>
            //         <button className=" py-2 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none   focus:ring-gray-200 px-5 dark:bg-white dark:text-black ">
            //           {item.buttonName}
            //         </button>
            //       </Link>
            //     </div>
            //   </div>
            // </div >