import { Card, Skeleton } from '@mui/material'
import React from 'react'

export const SkeletonCard = () => {
  return (
    <Card className="w-[32%] p-4">
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <div className="flex align-center mt-4 justify-between">
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} className="w-1/3" />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} className="w-1/3" />
      </div>
    </Card>
  )
}
