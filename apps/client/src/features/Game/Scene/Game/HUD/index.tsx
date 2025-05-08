import React from 'react'
import MoveCounter from 'features/Game/Scene/Game/HUD/MoveCounter'
import Players from 'features/Game/Scene/Game/HUD/Players'
import Inventory from 'features/Game/Scene/Game/HUD/Inventory'
import Fullscreen from 'features/Game/Scene/Game/HUD/Fullscreen'
import TurnAnnounceDialog, { type TurnAnnouncer } from 'widgets/Dialog/TurnAnnounceDialog'
import FightDialog, { type FightAnnouncer } from 'widgets/Dialog/FightDialog'
import { useSelector } from 'react-redux'
import { selectCurrentPlayer, selectFightingEnemy, selectFightingPlayer, selectPlayers, selectPlayerTurn } from 'features/Game/slice'

const HUD: React.FC = () => {
  const fightAnnouncer = React.useRef<FightAnnouncer>(null!)
  const turnAnnouncer = React.useRef<TurnAnnouncer>(null!)
  const playerTurnId = useSelector(selectPlayerTurn)
  const players = useSelector(selectPlayers)
  const fightingPlayer = useSelector(selectFightingPlayer)
  const fightingEnemy = useSelector(selectFightingEnemy)
  const currentPlayer = useSelector(selectCurrentPlayer)

  const playerTurn = React.useMemo(
    () => players.find((player) => player.id === playerTurnId),
    [playerTurnId]
  )

  React.useEffect(() => {
    if (!fightingPlayer || !fightingEnemy) {
      return
    }

    fightAnnouncer.current.announce(
      fightingPlayer.hero,
      fightingEnemy.type,
      fightingPlayer.id === currentPlayer.id
    )
  }, [fightingPlayer, fightingEnemy, currentPlayer])

  React.useEffect(() => {
    if (!playerTurn) {
      return
    }

    turnAnnouncer.current.announce({
      username : playerTurn.username,
      hero: playerTurn.hero
    })
  }, [playerTurn])

  return (
    <>
      <div className='absolute top-0 flex w-screen justify-center'>
        <div className='flex flex-row items-center gap-2'>
          <Inventory />
          <MoveCounter />
          <Fullscreen />
        </div>
      </div>
      <Players />
      <TurnAnnounceDialog ref={turnAnnouncer} />
      <FightDialog ref={fightAnnouncer} />
    </>
  )
}

export default HUD
