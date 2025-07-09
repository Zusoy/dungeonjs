import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { join, selectIsInError, selectLastErrorCode } from 'features/Rooms/application/slice'

export const JoinDialog: React.ForwardRefExoticComponent<React.RefAttributes<HTMLDialogElement>> = React.forwardRef<HTMLDialogElement>((_props, ref) => {
  const id = React.useId()
  const dispatch = useDispatch()
  const error = useSelector(selectIsInError)
  const errorCode = useSelector(selectLastErrorCode)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const roomId = data.get('roomId')?.toString() || null

    if (!roomId) {
      return
    }

    dispatch(join({ roomId }))
  }

  return (
    <dialog ref={ref} id={id} className='modal'>
      <div className='modal-box'>
        <form method='dialog'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            X
          </button>
        </form>
        <h3 className='font-bold text-lg'>Join a room</h3>
        <p className='py-4'>Join a room to play with your friends !</p>
        <form className='flex flex-col gap-4' onSubmit={onSubmit}>
          <input type='text' name='roomId' placeholder='Room name' className='input input-lg bg-slate-800 input-primary border-transparent' required />
          <button type='submit' className='btn btn-lg btn-success'>Join</button>
        </form>
        {(error && errorCode) && (
          <div role='alert' className='alert alert-error mt-4'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errorCode === 'room_not_found'
              ? <span>Room not found. Make sure it's the right name.</span>
              : <span>Max players count reached in this game, can't join</span>
            }
          </div>
        )}
      </div>
    </dialog>
  )
})
