import axios from 'axios'
import CryptoJS from 'crypto-js'

const instance = axios.create({
  baseURL: 'https://no23.lavina.tech',
})

const UserApi = {
  MySelf: async (key, secret) => {
    try {
      // eslint-disable-next-line
      let signString = `GET/myself${secret}`
      let sign = CryptoJS.MD5(signString).toString()
      const response = await instance.get('/myself', {
        headers: {
          'Content-Type': 'application/json',
          Key: key,
          Sign: sign,
        },
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  SignUp: async (key, secret) => {
    try {
      let data = JSON.stringify({
        key: key,
        secret: secret,
      })
      const response = await instance.post('/signup', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
}
export const BookApi = {
  getAllbooks: async (key, secret) => {
    try {
      let signString = `GET/books${secret}`
      let sign = CryptoJS.MD5(signString).toString()
      const response = await instance.get('/books', {
        headers: {
          'Content-Type': 'application/json',
          Key: key,
          Sign: sign,
        },
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  createBook: async (key, secret, isbn) => {
    try {
      let data = JSON.stringify({ isbn: isbn })
      let signString = `POST/books{"isbn":"${isbn}"}${secret}`
      let sign = CryptoJS.MD5(signString).toString()
      const response = await instance.post('/books', data, {
        headers: {
          'Content-Type': 'application/json',
          Key: key,
          Sign: sign,
        },
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  deleteBook: async (key, secret, id) => {
    try {
      let signString = `DELETE/books/${id}${secret}`
      let sign = CryptoJS.MD5(signString).toString()
      const response = await instance.delete(`/books/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Key: key,
          Sign: sign,
        },
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  editBook: async (key, secret, id, status) => {
    try {
      let data = JSON.stringify({ status: status })
      let signString = `PATCH/books/${id}{"status":${status}}${secret}`
      let sign = CryptoJS.MD5(signString).toString()
      const response = await instance.patch(`/books/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Key: key,
          Sign: sign,
        },
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
}
export default UserApi
