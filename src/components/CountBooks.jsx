import React from 'react'
import CreateBookBtn from './CreateBookBtn'
import { useSelector } from 'react-redux'

export const CountBooks = () => {
  const books = useSelector((state) => state.toolkit.books)

  return (
    <div className="container mx-auto flex items-center justify-between mt-6">
      <h1 className="text-4xl text-white font-bold">
        You’ve got{' '}
        <span style={{ color: '#6200EE' }}>
          {books ? books.length : 0} book
        </span>
      </h1>
      <CreateBookBtn />
    </div>
  )
}
