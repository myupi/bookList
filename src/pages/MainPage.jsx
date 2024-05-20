import React from 'react'
import AppBar from '../components/MyAppBar'
import { CountBooks } from '../components/CountBooks'
import { ContainerCards } from '../components/ContainerCards'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const MainPage = () => {
  const user = useSelector((state) => state.toolkit.user)

  if (!user.isOk) {
    return <Navigate to="/auth" />
  }

  return (
    <div className="w-full h-full flex flex-col">
      <AppBar />
      <CountBooks />
      <ContainerCards />
    </div>
  )
}
