import React from 'react'
import type { Nullable } from 'types/utils'
import type { DiceFace, DiceRef } from 'features/Game/Combat/presentation/HUD/Dice'
import { Dice } from 'features/Game/Combat/presentation/HUD/Dice'
import { AnimatePresence, motion } from 'motion/react'
import { Hero } from 'types/user'
import { SkeletonType } from 'types/enemy'
import { FaShieldAlt } from 'react-icons/fa'
import { FaDice } from 'react-icons/fa'
import { Countdown } from 'widgets/Time/Countdown'

export type AnnouncePayload = Readonly<{
  hero: Hero
  enemy: SkeletonType
  enemyDefense: number
  control: boolean
}>

export type ResolvePayload = Readonly<{
  firstDiceResult: number
  secondDiceResult: number
  inventoryBonus: number
  succeed: boolean
}>

export type CombatAnnouncer = {
  readonly announce: (payload: AnnouncePayload) => void
  readonly resolve: (payload: ResolvePayload) => Promise<void>
  readonly close: () => void
}

type Props = {
  readonly onAttack: () => void
  readonly onCombatEnd: () => void
}

export const CombatAnnounceDialog = React.forwardRef<CombatAnnouncer, Props>(({ onAttack, onCombatEnd }, ref) => {
  const id = React.useId()
  const dialog = React.useRef<HTMLDialogElement>(null!)
  const firstDice = React.useRef<DiceRef>(null!)
  const secondDice = React.useRef<DiceRef>(null!)
  const [announced, setAnnounced] = React.useState<boolean>(false)
  const [attacked, setAttacked] = React.useState<boolean>(false)
  const [hero, setHero] = React.useState<Nullable<Hero>>(null!)
  const [enemy, setEnemy] = React.useState<Nullable<SkeletonType>>(null!)
  const [enemyDefense, setEnemyDefense] = React.useState<number>(0)
  const [inventoryBonus, setInventoryBonus] = React.useState<number>(0)
  const [control, setControl] = React.useState<boolean>(false)
  const [succeed, setSucceed] = React.useState<boolean|null>(null!)

  const attackListener = React.useCallback(() => {
    if (attacked) {
      return
    }

    setAttacked(true)
    onAttack?.()
  }, [onAttack, attacked])

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
    announce: ({ hero, enemy, enemyDefense, control }: AnnouncePayload): void => {
      setHero(hero)
      setEnemy(enemy)
      setEnemyDefense(enemyDefense)
      setControl(control)
      setAnnounced(true)
      dialog.current.showModal()
    },
    resolve: async ({ firstDiceResult, secondDiceResult, inventoryBonus, succeed }: ResolvePayload): Promise<void> => {
      console.log(firstDiceResult, secondDiceResult, succeed)
      await Promise.all([
        firstDice.current.rollTo(firstDiceResult as DiceFace),
        secondDice.current.rollTo(secondDiceResult as DiceFace)
      ])

      setInventoryBonus(inventoryBonus)
      setSucceed(succeed)
    },
    close: (): void => {
      setHero(null)
      setEnemy(null)
      setEnemyDefense(0)
      setInventoryBonus(0)
      setControl(false)
      setAttacked(false)
      setSucceed(null)
      setAnnounced(false)
      dialog.current.close()
    }
  }), [dialog, firstDice, secondDice])

  return (
    <AnimatePresence mode='wait' initial={false}>
      <motion.dialog id={id} ref={dialog} className='modal modal-bottom sm:modal-middle' onCancel={e => e.preventDefault()}>
        <div className={`modal-box p-12 transition-all ease-in-out ${succeed === null ? '' : succeed ? 'bg-success' : 'bg-error'}`}>
          {announced && (
            <div className='flex w-full flex-col gap-4'>
              <div className='flex w-full flex-row'>
                <div className='card rounded-box grid grow place-items-center'>
                  <figure>
                    <img alt='avatar' src={`/img/hero/${hero?.toString()}.png`} className='w-32 h-32 rounded-md' />
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
                      <img alt='avatar' src={`/img/skeleton/${enemy?.toString()}.png`} className='w-32 h-32 rounded-md' />
                    </figure>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4 items-center justify-center'>
                <div className='flex gap-4 items-center justify-center mt-2'>
                  <Dice ref={firstDice} />
                  <Dice ref={secondDice} />
                </div>
                <AnimatePresence>
                  {inventoryBonus
                    ? (
                      <motion.div
                        className='flex w-12 h-12 text-black text-lg rounded-xl p-4 justify-center items-center bg-gradient-to-b from-amber-100 to-amber-500'
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                          duration: 0.4,
                          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                        }}
                      >
                        <span>+{inventoryBonus}</span>
                      </motion.div>
                    )
                    : null
                  }
                </AnimatePresence>
              </div>
              {control
                ? (
                  <button
                    type='button'
                    className='btn btn-error'
                    onClick={attackListener}
                    disabled={attacked}
                  >
                    <FaDice />
                    Attack
                  </button>
                )
                : null
              }
              {succeed !== null
                ? (
                  <div className='flex justify-center items-center'>
                    <Countdown delay={2000} type='primary' onFinish={onCombatEnd} />
                  </div>
                )
                : null
              }
            </div>
          )}
        </div>
      </motion.dialog>
    </AnimatePresence>
  )
})
