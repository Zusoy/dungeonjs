import React from 'react'
import Enemies from 'features/Game/Scene/Game/HUD/Enemies'
import MoveCounter from 'features/Game/Scene/Game/HUD/MoveCounter'
import Players from 'features/Game/Scene/Game/HUD/Players'
import Fullscreen from 'features/Game/Scene/Game/HUD/Fullscreen'
import TurnAnnounceDialog, { type TurnAnnouncer } from 'widgets/Dialog/TurnAnnounceDialog'
import FightAnnounceDialog, { type FightAnnouncer } from 'widgets/Dialog/FightAnnounceDialog'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentPlayer,
  selectFightingEnemy,
  selectFightingPlayer,
  selectPlayers,
  selectPlayerTurn,
  attack,
  selectOriginalFightCoords
} from 'features/Game/slice'

const HUD: React.FC = () => {
  const dispatch = useDispatch()
  const fightAnnouncer = React.useRef<FightAnnouncer>(null!)
  const turnAnnouncer = React.useRef<TurnAnnouncer>(null!)
  const playerTurnId = useSelector(selectPlayerTurn)
  const players = useSelector(selectPlayers)
  const fightingPlayer = useSelector(selectFightingPlayer)
  const fightingEnemy = useSelector(selectFightingEnemy)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const originalFightCoords = useSelector(selectOriginalFightCoords)

  const playerTurn = React.useMemo(
    () => players.find((player) => player.id === playerTurnId),
    [playerTurnId]
  )

  const launchAttack = React.useCallback(() => {
    if (!currentPlayer || !fightingEnemy || !originalFightCoords) {
      return
    }

    dispatch(attack({
      enemyId: fightingEnemy.id,
      originCoords: originalFightCoords
    }))
  }, [currentPlayer, fightingEnemy, originalFightCoords, dispatch])

  React.useEffect(() => {
    if (!fightingPlayer || !fightingEnemy) {
      fightAnnouncer.current.close()
      return
    }

    fightAnnouncer.current.announce(
      fightingPlayer.hero,
      fightingEnemy.type,
      fightingEnemy.defense,
      fightingPlayer.id === currentPlayer.id,
      fightingPlayer.inventory
    )
  }, [fightingPlayer, fightingEnemy, currentPlayer])

  React.useEffect(() => {
    if (!playerTurn) {
      return
    }

    turnAnnouncer.current.announce({
      username: playerTurn.username,
      hero: playerTurn.hero
    })
  }, [playerTurn])

  return (
    <>
      <div className='absolute top-0 flex w-screen justify-center'>
        <div className='flex flex-row items-center gap-2'>
          <Enemies />
          <MoveCounter />
          <Fullscreen />
        </div>
      </div>
      <Players />
      <TurnAnnounceDialog ref={turnAnnouncer} />
      <FightAnnounceDialog ref={fightAnnouncer} onAttack={launchAttack} />
    </>
  )
}

export default HUD
