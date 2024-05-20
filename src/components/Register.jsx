import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import UserApi from '../api/api'
import { setUser } from '../store/toolkitSlice'
import { useNavigate } from 'react-router-dom'

export const Register = ({ setIsLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [conPassword, setConPassword] = useState('')
  const [isTrue, setIsTrue] = useState(false)
  const [isHas, setIsHas] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function submit(event) {
    event.preventDefault()
    setIsTrue(false)
    setIsHas(false)
    if (password !== conPassword) {
      return setIsTrue(true)
    }
    const user = await UserApi.SignUp(username, password)
    console.log(user)
    if (!user.isOk) {
      console.log(user)
      return setIsHas(true)
    }
    dispatch(setUser(JSON.parse(JSON.stringify(user))))
    navigate('/')
  }

  return (
    <div className="w-[430px] bg-white shadow-lg py-12 px-7 rounded-xl flex flex-col gap-6">
      <h1 className="text-center text-4xl font-bold">Sign up</h1>
      <form onSubmit={submit}>
        <div className="w-full mb-3 flex flex-col">
          <label htmlFor="username">Username</label>
          <TextField
            required
            name="username"
            variant="outlined"
            placeholder="Enter your username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="w-full mb-3 flex flex-col">
          <label htmlFor="password" className="mt-3">
            Password
          </label>
          <TextField
            required
            name="password"
            type="password"
            variant="outlined"
            placeholder="Enter your password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="w-full mb-3 flex flex-col">
          <label htmlFor="password" className="mt-3">
            Password
          </label>
          <TextField
            required
            name="password"
            type="password"
            variant="outlined"
            placeholder="Enter your confirm password"
            onChange={(event) => setConPassword(event.target.value)}
          />
        </div>
        {isTrue ? (
          <p className="text-[red] text-sm">Password mismatch</p>
        ) : (
          <></>
        )}
        {isHas ? (
          <p className="text-[red] text-sm">This user already exists</p>
        ) : (
          <></>
        )}
        <div className="w-full mt-3 flex flex-col gap-3">
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: '#6200EE' }}
          >
            Button
          </Button>
          <p className="text-center text-sm font-thin">
            Already signed up?
            <span
              style={{ color: '#6200EE' }}
              className="cursor-pointer hover:opacity-70"
              onClick={() => setIsLogin(true)}
            >
              Go to sign in.
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}
