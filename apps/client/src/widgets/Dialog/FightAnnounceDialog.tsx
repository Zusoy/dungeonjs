import React from 'react'
import { SkeletonType } from 'types/enemy'
import { Hero, type Inventory } from 'types/user'
import type { Nullable } from 'types/utils'
import { FaShieldAlt } from 'react-icons/fa'
import Weapon from 'widgets/HUD/Weapon'

export type FightAnnouncer = {
  readonly announce: (hero: Hero, enemy: SkeletonType, enemyDefense: number, control: boolean, inventory: Inventory) => void
  readonly close: () => void
}

type Props = {
  readonly onAttack: React.MouseEventHandler<HTMLButtonElement>
}

const FightAnnounceDialog = React.forwardRef<FightAnnouncer, Props>(({ onAttack }, ref) => {
  const id = React.useId()
  const dialog = React.useRef<HTMLDialogElement>(null!)
  const [hero, setHero] = React.useState<Nullable<Hero>>(null!)
  const [enemy, setEnemy] = React.useState<Nullable<SkeletonType>>(null!)
  const [inventory, setInventory] = React.useState<Nullable<Inventory>>(null!)
  const [enemyDefense, setEnemyDefense] = React.useState<number>(0)
  const [control, setControl] = React.useState<boolean>(false)

  React.useImperativeHandle<FightAnnouncer, FightAnnouncer>(ref, () => ({
    announce: (hero: Hero, enemy: SkeletonType, enemyDefense: number, control: boolean, inventory: Inventory) => {
      setHero(hero)
      setEnemy(enemy)
      setControl(control)
      setEnemyDefense(enemyDefense)
      setInventory(inventory)
      dialog.current.showModal()
    },
    close: () => {
      setHero(null)
      setEnemy(null)
      setInventory(null)
      setControl(false)
      setEnemyDefense(0)
      dialog.current.close()
    }
  }), [dialog])

  return (
    <dialog id={id} ref={dialog} className='modal modal-bottom sm:modal-middle'>
      <div className='modal-box p-12'>
        {(enemy && hero && inventory) && (
          <div className='flex w-full flex-col gap-4'>
            <div className='flex w-full flex-row'>
              <div className='card rounded-box grid grow place-items-center'>
                <figure>
                  <img alt='avatar' src={`/img/hero/${hero.toString()}.png`} className='w-32 h-32 rounded-md' />
                </figure>
              </div>
              <div className="divider divider-horizontal">VS</div>
              <div className='card rounded-box grid grow place-items-center'>
                <div className="indicator">
                  <span className="indicator-item badge badge-primary">
                    <FaShieldAlt />
                    {enemyDefense}
                  </span>
                  <figure>
                    <img alt='avatar' src={`/img/skeleton/${enemy.toString()}.png`} className='w-32 h-32 rounded-md' />
                  </figure>
                </div>
              </div>
            </div>
            <div className='flex w-full items-center justify-center gap-4 p-2'>
              {inventory.weapons.map(
                (weapon, index) => <Weapon key={index} attack={weapon.attack} icon={weapon.icon} />
              )}
            </div>
            {control && <button type='button' className='btn btn-error' onClick={onAttack}>Attack !</button>}
          </div>
        )}
      </div>
    </dialog>
  )
})

export default FightAnnounceDialog
