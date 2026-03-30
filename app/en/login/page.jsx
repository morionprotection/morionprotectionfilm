import Login from '@/components/Login/Login'
import React from 'react'

export const metadata = {
  title: "Login to Morion Dashboard",
  description: "Access your Morion dealer dashboard to manage warranties, settings, and more.",
};

const LoginPage = () => {
  return (
    <>
    <Login/>
    </>
  )
}

export default LoginPage