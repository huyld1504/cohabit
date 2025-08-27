import React, { useEffect, useState } from 'react'
import AuthForm from '../../components/auth/AuthForm';

const LoginPage = () => {
  const [authType, setAuthType] = useState('login');

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === '/login') {
      setAuthType('login');
    } else if (pathname === '/register') {
      setAuthType('register');
    }
  }, []);
  
  return (
    <div>
      <AuthForm type={authType} />
    </div>
  )
}

export default LoginPage