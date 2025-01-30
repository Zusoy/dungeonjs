import React from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'features/Authentication/slice'

const Login: React.FC = () => {
  const dispatch = useDispatch()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const username = data.get('username')?.toString() || null

    if (!username) {
      return
    }

    dispatch(connect({ username }))
  }

  return (
    <div className='flex flex-col gap-8 h-screen justify-center items-center'>
      <form onSubmit={onSubmit} className='flex flex-col gap-4 items-center justify-center w-full z-[999]'>
        <h1 className='text-2xl text-white'>Welcome hero !</h1>
        <input type='text' name='username' placeholder='Username' className='input input-lg input-primary bg-slate-600 border-transparent' required />
        <button type='submit' className='btn btn-primary'>Login</button>
      </form>
    </div>
  )
}

export default Login
