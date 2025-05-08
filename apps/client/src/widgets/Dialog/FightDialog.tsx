import React from 'react'
import { SkeletonType } from 'types/enemy'
import { Hero } from 'types/user'
import type { Nullable } from 'types/utils'

export type FightAnnouncer = {
  readonly announce: (hero: Hero, enemy: SkeletonType, control: boolean) => void
}

const FightDialog = React.forwardRef<FightAnnouncer>((_, ref) => {
  const id = React.useId()
  const dialog = React.useRef<HTMLDialogElement>(null!)
  const [hero, setHero] = React.useState<Nullable<Hero>>(null!)
  const [enemy, setEnemy] = React.useState<Nullable<SkeletonType>>(null!)
  const [control, setControl] = React.useState<boolean>(false)

  React.useImperativeHandle<FightAnnouncer, FightAnnouncer>(ref, () => ({
    announce: (hero: Hero, enemy: SkeletonType, control: boolean) => {
      setHero(hero)
      setEnemy(enemy)
      setControl(control)
      dialog.current.showModal()
    }
  }), [dialog])

  return (
    <dialog id={id} ref={dialog} className='modal modal-bottom sm:modal-middle'>
      <div className='modal-box p-12'>
        {(enemy && hero) && (
          <div className='flex w-full flex-col gap-4'>
            <div className='flex w-full flex-row'>
              <div className='card rounded-box grid grow place-items-center'>
                <figure>
                  <img alt='avatar' src={`/img/hero/${hero.toString()}.png`} className='w-32 h-32 rounded-md' />
                </figure>
              </div>
              <div className="divider divider-horizontal">VS</div>
              <div className='card rounded-box grid grow place-items-center'>
                <figure>
                  <img alt='avatar' src={`/img/skeleton/${enemy.toString()}.png`} className='w-32 h-32 rounded-md' />
                </figure>
              </div>
            </div>
            {control && <button type='button' className='btn btn-error'>Fight !</button>}
          </div>
        )}
      </div>
    </dialog>
  )
})

export default FightDialog
