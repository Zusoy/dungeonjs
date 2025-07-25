import React from 'react'
import type { Weapon } from 'types/user'
import type { Nullable } from 'types/utils'
import type { DiceFace, DiceRef } from 'features/Game/Combat/presentation/Dice'
import { AnimatePresence, motion } from 'motion/react'
import { Hero } from 'types/user'
import { SkeletonType } from 'types/enemy'
import { FaShieldAlt } from 'react-icons/fa'
import { Dice } from 'features/Game/Combat/presentation/Dice'
import WeaponIcon from 'widgets/HUD/Weapon'

export type AnnouncePayload = Readonly<{
  hero: Hero
  enemy: SkeletonType
  enemyDefense: number
  control: boolean
  inventory: Weapon[]
}>

export type ResolvePayload = Readonly<{
  firstDiceResult: number
  secondDiceResult: number
  inventoryBonus: number
}>

export type CombatAnnouncer = {
  readonly announce: (payload: AnnouncePayload) => void
  readonly resolve: (payload: ResolvePayload) => void
  readonly close: () => void
}

type Props = {
  readonly onAttack: React.MouseEventHandler<HTMLButtonElement>
}

export const CombatAnnounceDialog = React.forwardRef<CombatAnnouncer, Props>(({ onAttack }, ref) => {
  const id = React.useId()
  const dialog = React.useRef<HTMLDialogElement>(null!)
  const firstDice = React.useRef<DiceRef>(null!)
  const secondDice = React.useRef<DiceRef>(null!)
  const [hero, setHero] = React.useState<Nullable<Hero>>(null!)
  const [enemy, setEnemy] = React.useState<Nullable<SkeletonType>>(null!)
  const [inventory, setInventory] = React.useState<Weapon[]>([])
  const [enemyDefense, setEnemyDefense] = React.useState<number>(0)
  const [control, setControl] = React.useState<boolean>(false)

  React.useEffect(() => {
    const dialogEl = dialog.current

    const keyDownListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
      }
    }

    const cancelListener = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
    }

    window.addEventListener('keydown', keyDownListener)
    dialogEl.addEventListener('cancel', cancelListener)

    return () => {
      dialogEl.removeEventListener('cancel', cancelListener)
      window.removeEventListener('keydown', keyDownListener)
    }
  }, [])

  React.useImperativeHandle<CombatAnnouncer, CombatAnnouncer>(ref, () => ({
    announce: ({ hero, enemy, enemyDefense, control, inventory }: AnnouncePayload) => {
      setHero(hero)
      setEnemy(enemy)
      setEnemyDefense(enemyDefense)
      setInventory(inventory)
      setControl(control)
      dialog.current.showModal()
    },
    resolve: ({ firstDiceResult, secondDiceResult, inventoryBonus }: ResolvePayload) => {
      firstDice.current.rollTo(firstDiceResult as DiceFace)
      secondDice.current.rollTo(secondDiceResult as DiceFace)
    },
    close: () => {
      setHero(null)
      setEnemy(null)
      setInventory([])
      setEnemyDefense(0)
      setControl(false)
      dialog.current.close()
    }
  }), [dialog, firstDice, secondDice])

  return (
    <AnimatePresence mode='wait' initial={false}>
      <motion.dialog id={id} ref={dialog} className='modal modal-bottom sm:modal-middle' onCancel={e => e.preventDefault()}>
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
                {inventory.map(
                  (weapon, index) => <WeaponIcon key={index} attack={weapon.attack} icon={weapon.icon} />
                )}
              </div>
              {control && <button type='button' className='btn btn-error' onClick={onAttack}>Attack !</button>}
              <div className='flex gap-4 items-center justify-center'>
                <Dice ref={firstDice} />
                <Dice ref={secondDice} />
              </div>
            </div>
          )}
        </div>
      </motion.dialog>
    </AnimatePresence>
  )
})
