import { createSlice } from '@reduxjs/toolkit'

const toolkitSLice = createSlice({
  name: 'toolkit',
  initialState: {
    user: {
      isOk: false,
    },
    books: [],
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setBooks(state, action) {
      state.books = action.payload
    },
    removeBook(state) {
      state.books.pop()
    },
  },
})

export default toolkitSLice.reducer
export const { setUser, setBooks, removeBook } = toolkitSLice.actions
