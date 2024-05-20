import { Button, Card, Dialog, DialogTitle, Slide } from '@mui/material'
import React, { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DrawIcon from '@mui/icons-material/Draw'
import style from './style.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { BookApi } from '../api/api'
import { setBooks } from '../store/toolkitSlice'
import { Navigate } from 'react-router-dom'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const status = {
  0: <span className="bg-[red] text-white py-1 px-2 text-sm rounded">NEW</span>,
  1: (
    <span className="bg-[#FFEC43] text-white py-1 px-2 text-sm rounded">
      READING
    </span>
  ),
  2: (
    <span className="bg-[#00FF29] text-white py-1 px-2 text-sm rounded">
      FINISHED
    </span>
  ),
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const BookCard = ({ book }) => {
  const [hovered, setHovered] = useState(false)
  const { id, author, cover, isbn, pages, published, title } = book.book
  const user = useSelector((state) => state.toolkit.user)
  const { key, secret } = user.data
  const dispatch = useDispatch()
  const fontSize = 20 - title.length * 0.1

  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const deleteBook = async (id) => {
    let con = window.confirm('Are you sure you want to delete?')
    if (!con) {
      return false
    }
    await BookApi.deleteBook(key, secret, id)
    const books = await BookApi.getAllbooks(key, secret)
    dispatch(setBooks(JSON.parse(JSON.stringify(books.data))))
    return <Navigate to="/" />
  }

  const editBook = async (id, status) => {
    await BookApi.editBook(key, secret, id, status)
    const books = await BookApi.getAllbooks(key, secret)
    dispatch(setBooks(JSON.parse(JSON.stringify(books.data))))
    handleClose()
    return <Navigate to="/" />
  }

  return (
    <div
      className="relative w-[32%]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card className="w-full p-4 relative" style={{ zIndex: '2' }}>
        <h6 className="font-semibold" style={{ fontSize: fontSize }}>
          {title}
        </h6>
        <p className="text-sm font-light">Cover: {cover}</p>
        <p className="text-sm font-light">Pages: {pages}</p>
        <p className="text-sm font-light">Published: {published}</p>
        <p className="text-sm font-light">Isbn: {isbn}</p>
        <div className="flex align-center mt-4 justify-between">
          <p className="text-sm font-light m-0 p-0">
            {author} / {published}
          </p>
          {status[book.status]}
        </div>
      </Card>
      <div
        className={`absolute flex flex-col top-[15px] right-0 transition-transform duration-300 ${hovered ? 'translate-x-[26px]' : 'translate-x-0'}`}
        style={{ zIndex: '1' }}
      >
        <button
          className={'bg-[red] w-[26px] mb-1 rounded ' + style.delete}
          onClick={() => deleteBook(id)}
        >
          <DeleteOutlineIcon className="text-white" />
        </button>
        <button
          className={'bg-[#6200EE] w-[26px] rounded ' + style.edit}
          onClick={handleClickOpen}
        >
          <DrawIcon className="text-white" />
        </button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex align-center justify-between">
          <span>Status a book</span>
          <HighlightOffIcon
            className="mt-1 cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <div className="flex w-[300px] m-3 align-center justify-center gap-3 flex-col">
          <Button
            variant="contained"
            style={{ background: 'red' }}
            onClick={() => editBook(id, 0)}
          >
            NEW
          </Button>
          <Button
            variant="contained"
            style={{ background: '#FFEC43' }}
            onClick={() => editBook(id, 1)}
          >
            READING
          </Button>
          <Button
            variant="contained"
            style={{ background: '#00FF29' }}
            onClick={() => editBook(id, 2)}
          >
            FINISHED
          </Button>
        </div>
        <div className="flex align-center justify-center w-full mb-4">
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{ borderColor: '#6200EE' }}
          >
            Close
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
