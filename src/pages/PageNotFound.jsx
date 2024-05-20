import React from 'react'
import NotFound from '../assets/undraw_page_not_found_re_e9o6 1.svg'
import { Link, Navigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'

export const PageNotFound = () => {
  const user = useSelector((state) => state.toolkit.user)

  if (!user.isOk) {
    return <Navigate to="/auth" />
  }
  
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-5">
      <img src={NotFound} alt="Page Not Found" />
      <div className="flex items-center justify-center gap-3">
        <Link to='/'>
          <Button variant="contained" style={{ backgroundColor: '#6200EE' }}>
            Go Home Page
          </Button>
        </Link>
        <Link>
          <Button variant="outlined" style={{ borderColor: '#6200EE' }}>
            Reload Page
          </Button>
        </Link>
      </div>
    </div>
  )
}
