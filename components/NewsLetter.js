import React, { useState } from 'react'

const NewsLetter = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });
  
      if (res.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    };

    return (
        <form className="" onSubmit={handleSubmit}>
            <div className="container flex flex-wrap justify-center gap-3 items-center mx-auto md:px-10 py-8 text-center">
            
            <div className="break-words"><p className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</p>Stay up to date with our latest news and updates.</div>
              <div className='flex flex-col max-w-sm px-4 gap-5  justify-center items-center'>
                <div className="flex gap-3">
                <input
                  type="text"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  autoComplete="false"
                  className=" w-1/3 px-3 py-2 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4  border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                />
                  <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  name="email"
                  required
                  autoComplete="false"
                  className="px-3 py-2 w-4/5 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                />
                </div>
                <button type="submit" className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black ">
                    Subscribe
                </button>
                </div>
            </div>
        </form>

    );
}

export default NewsLetter



