import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { InputAdornment, OutlinedInput } from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'
import { useDispatch, useSelector } from 'react-redux'
import { BookApi } from '../api/api'
import { setBooks } from '../store/toolkitSlice'
import { Navigate } from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function CreateBookBtn() {
  const user = useSelector((state) => state.toolkit.user)
  const [isbn, setIsbn] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [is13, setIs13] = React.useState(false)
  const { key, secret } = user.data
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const create = async () => {
    if (isbn.length !== 13) {
      return setIs13(true)
    }
    const newBook = await BookApi.createBook(key, secret, isbn)
    if (!newBook.isOk) {
      return alert('Book with this isbn already exists')
    }
    setIsbn('')
    const books = await BookApi.getAllbooks(key, secret)
    dispatch(setBooks(JSON.parse(JSON.stringify(books.data))))
    setOpen(false)

    return <Navigate to="/" />
  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        style={{ backgroundColor: '#6200EE' }}
        onClick={handleClickOpen}
      >
        + Create a book
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex align-center justify-between">
          <span>Create a book</span>
          <HighlightOffIcon
            className="mt-1 cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <form className="flex flex-col w-[374px] mt-3">
            <label htmlFor="isbn">ISBN</label>
            <OutlinedInput
              id="isbn"
              startAdornment={
                <InputAdornment position="start">
                  <LinkIcon style={{ transform: 'rotateZ(-45deg)' }} />
                </InputAdornment>
              }
              onChange={(event) => setIsbn(event.target.value)}
              inputProps={{ maxLength: 13 }}
              value={isbn}
            />
            {is13 ? (
              <p className="text-[red] text-sm">
                Isbn must be 13 characters long
              </p>
            ) : (
              <></>
            )}
          </form>
        </DialogContent>
        <div className="flex align-center justify-center w-full mb-4 gap-3">
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{ borderColor: '#6200EE', width: '43%' }}
          >
            Close
          </Button>
          <Button
            onClick={create}
            variant="contained"
            style={{ backgroundColor: '#6200EE', width: '43%' }}
          >
            Submit
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  )
}
