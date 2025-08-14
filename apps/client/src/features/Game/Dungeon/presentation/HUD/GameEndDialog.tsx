import React from 'react'
import { UserPayload } from 'types/user'
import { AnimatePresence, motion } from 'motion/react'
import { Nullable } from 'types/utils'

type GameEndData = {
  readonly winner: UserPayload
  readonly players: UserPayload[]
}

export type GameEndDialogRef = {
  readonly show: (data: GameEndData) => void
}

export const GameEndDialog = React.forwardRef<GameEndDialogRef>((_, ref) => {
  const id = React.useId()
  const dialog = React.useRef<HTMLDialogElement>(null!)
  const [gameEndData, setGameEndData] = React.useState<Nullable<GameEndData>>(null)

  React.useImperativeHandle<GameEndDialogRef, GameEndDialogRef>(ref, () => ({
    show: (data: GameEndData) => {
      setGameEndData(data)
      dialog.current.showModal()
    }
  }), [dialog])

  const close = React.useCallback(() => {
    setGameEndData(null)
    dialog.current.close()
  }, [dialog])

  return (
    <AnimatePresence mode='wait' initial={false}>
      <motion.dialog id={id} ref={dialog} className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box max-w-md'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2' onClick={close}>
              ✕
            </button>
          </form>
          {gameEndData && (
            <div className='flex flex-col w-full items-center gap-6'>
              <div className='text-center'>
                <h2 className='text-2xl font-bold mb-2'>Game Over!</h2>
                <p className='text-lg text-success font-semibold'>The Golem has been defeated!</p>
              </div>

              <div className='flex flex-col items-center gap-4 p-4 bg-success/10 rounded-lg border border-success/20'>
                <h3 className='text-xl font-bold text-success'>🏆 Winner</h3>
                <div className='flex flex-col items-center gap-2'>
                  <figure>
                    <img
                      src={`/img/hero/${gameEndData.winner.hero.toString()}.png`}
                      alt={`${gameEndData.winner.hero} hero`}
                      className='w-20 h-20'
                    />
                  </figure>
                  <div className='text-center'>
                    <p className='font-bold text-lg'>{gameEndData.winner.username}</p>
                    <p className='text-sm opacity-70'>
                      {gameEndData.winner.inventory.treasures} treasures
                    </p>
                  </div>
                </div>
              </div>
              <div className='w-full'>
                <h4 className='text-lg font-semibold mb-3 text-center'>Final Scores</h4>
                <div className='space-y-2'>
                  {gameEndData.players.map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${player.id === gameEndData.winner.id
                          ? 'bg-success/20 border border-success/30'
                          : 'bg-base-200'
                        }`}
                    >
                      <div className='flex items-center gap-3'>
                        <span className='text-sm font-mono w-6'>
                          #{index + 1}
                        </span>
                        <figure>
                          <img
                            src={`/img/hero/${player.hero.toString()}.png`}
                            alt={`${player.hero} hero`}
                            className='w-10 h-10'
                          />
                        </figure>
                        <span className='font-medium'>{player.username}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='text-lg'>💎</span>
                        <span className='font-bold'>{player.inventory.treasures}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className='btn btn-primary btn-wide'
                onClick={close}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </motion.dialog>
    </AnimatePresence>
  )
})