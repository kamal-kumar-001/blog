import React, { useState } from 'react';
import Router from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('tokenExpiry', Date.now() + 24 * 60 * 60 * 1000);
      // Router.push('/admin');
      // const pathname = '/admin';
      Router.reload(window.location.pathname)
    } catch (err) {
      setError(err.statusText);
    }
  };
  

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
    <form onSubmit={handleSubmit}>
  <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
    <h1 className="font-bold text-center text-2xl mb-5">Admin</h1>  
    <div className=" shadow w-full rounded-lg divide-y">
      <div className="px-5 py-7">
        <label className="font-semibold text-sm  pb-1 block">E-mail</label>
        <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        <label className="font-semibold text-sm  pb-1 block">Password</label>
        <input type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
            <span className="inline-block mr-2">Login</span>
        </button>
      </div>
    </div>
  </div>
    </form>
    </>
  );
};

export default Login;
