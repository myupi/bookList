import React, { useState } from 'react'
import { Login } from '../components/Login'
import { Register } from '../components/Register'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const user = useSelector((state) => state.toolkit.user)

  if (user.isOk) {
    return <Navigate to="/" />
  }
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
    </div>
  )
}
