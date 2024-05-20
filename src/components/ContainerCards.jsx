import React, { useEffect, useState } from 'react'
import { BookCard } from './BookCard'
import { SkeletonCard } from './SkeletonCard'
import { BookApi } from '../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setBooks } from '../store/toolkitSlice'

export const ContainerCards = () => {
  const user = useSelector((state) => state.toolkit.user)
  const books = useSelector((state) => state.toolkit.books)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { key, secret } = user.data

  async function fetchBooks() {
    setLoading(true)
    const books = await BookApi.getAllbooks(key, secret)
    dispatch(setBooks(JSON.parse(JSON.stringify(books.data))))
    setLoading(false)
  }
  
  useEffect(() => {
    fetchBooks()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container mx-auto mt-3 flex flex-col">
      <p className="text-xl text-white">Your books today</p>
      <div
        className={`flex align-stretch justify-between gap-y-3 flex-wrap mt-6 `}
      >
        {loading ? (
          Array(6)
            .fill()
            .map((el, index) => <SkeletonCard key={index} />)
        ) : books ? (
          books.map((el, index) => <BookCard book={el} key={index} />)
        ) : (
          <p className="text-white text-5xl font-bold">No books</p>
        )}
      </div>
    </div>
  )
}
