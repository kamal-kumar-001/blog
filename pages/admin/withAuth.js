import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Login from '../../components/adminComponents/login'

const WithAuth = (Component) => {
  return (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const checkLogin = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false);
          return;
        }
        const res = await fetch('/api/checkToken', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setIsLoggedIn(data.isLoggedIn);
        }
      };
      checkLogin();
    }, []);

    if (!isLoggedIn) {
      return <Login />
    }
    return <Component {...props} />;
  };
};
export default WithAuth
