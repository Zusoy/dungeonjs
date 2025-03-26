import React from 'react'
import Progress from 'widgets/Time/Progress'
import { Hero } from 'types/user'
import { Nullable } from 'types/utils'

type UserLite = {
  readonly username: string
  readonly hero: Hero
}

export type TurnAnnouncer = {
  readonly announce: (user: UserLite) => void
}

const TurnAnnounceDialog = React.forwardRef<TurnAnnouncer>((_, ref) => {
  const id = React.useId()
  const dialog = React.useRef<HTMLDialogElement>(null!)
  const [target, setTarget] = React.useState<Nullable<UserLite>>(null)

  React.useImperativeHandle<TurnAnnouncer, TurnAnnouncer>(ref, () => ({
    announce: (user: UserLite) => {
      setTarget(user)
      dialog.current.showModal()
    }
  }), [dialog])

  const close = React.useCallback(() => {
    dialog.current.close()
  }, [dialog])

  return (
    <dialog id={id} ref={dialog} className='modal modal-bottom sm:modal-middle'>
      <div className='modal-box'>
        {target && (
          <div className='flex flex-col w-full items-center'>
            <div className='flex flex-row gap-4'>
              <figure>
                <img src={`/img/hero/${target.hero.toString()}.png`} alt='avatar' className='w-24 h-24' />
              </figure>
              <div className='flex flex-col gap-2 justify-center'>
                <h3 className='font-bold text-lg'>{target.username}</h3>
                <p className='text-lg'>It's your turn!</p>
              </div>
            </div>
            <div>
              <Progress max={2000} type='primary' onFinish={close} />
            </div>
          </div>
        )}
      </div>
    </dialog>
  )
})

export default TurnAnnounceDialog
