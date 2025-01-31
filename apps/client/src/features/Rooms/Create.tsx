import React from 'react'
import { create } from 'features/Rooms/slice'
import { useDispatch } from 'react-redux'

const Create: React.ForwardRefExoticComponent<React.RefAttributes<HTMLDialogElement>> = React.forwardRef<HTMLDialogElement>((_props, ref) => {
  const id = React.useId()
  const dispatch = useDispatch()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const roomId = data.get('roomId')?.toString() || null

    if (!roomId) {
      return
    }

    dispatch(create({ roomId }))
  }

  return (
    <dialog ref={ref} id={id} className='modal'>
      <div className='modal-box'>
        <form method='dialog'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            X
          </button>
        </form>
        <h3 className='font-bold text-lg'>Create new room</h3>
        <p className='py-4'>Create a new room to invites your friends in a game !</p>
        <form className='flex flex-col gap-4' onSubmit={onSubmit}>
          <input type='text' name='roomId' placeholder='Room name' className='input input-lg bg-slate-800 input-primary border-transparent' required />
          <button type='submit' className='btn btn-lg btn-success'>Create</button>
        </form>
      </div>
    </dialog>
  )
})

export default Create
