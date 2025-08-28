import React, { useEffect, useState } from 'react'
import AuthForm from '../../components/auth/AuthForm';

const RegisterPage = () => {
  const [authType, setAuthType] = useState('register');
  
    useEffect(() => {
      const pathname = window.location.pathname;
      if (pathname === '/login') {
        setAuthType('login');
      } else if (pathname === '/register') {
        setAuthType('register');
      }
    }, []);
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <AuthForm type={authType} />
    </div>
  )
}

export default RegisterPage