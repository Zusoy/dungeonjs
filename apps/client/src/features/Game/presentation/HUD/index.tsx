import React from 'react'
import { PlayerList } from 'features/Game/presentation/HUD/PlayerList'
import { EnemyList } from 'features/Game/presentation/HUD/EnemyList'
import { LootList } from 'features/Game/presentation/HUD/LootList'
import { MoveCounter } from 'features/Game/presentation/HUD/MoveCounter'
import { PickChestButton } from 'features/Game/presentation/HUD/PickChestButton'
import { PickLootButton } from 'features/Game/presentation/HUD/PickLootButton'
import TurnAnnounceDialog, { type TurnAnnouncer } from 'widgets/Dialog/TurnAnnounceDialog'
import FightAnnounceDialog, { type FightAnnouncer } from 'widgets/Dialog/FightAnnounceDialog'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentPlayer,
  selectFightingEnemy,
  selectFightingPlayer,
  selectPlayerTurn,
  attack,
  selectOriginalFightCoords
} from 'features/Game/application/slice'
import { selectPlayers } from 'features/Lobby/application/slice'

export const GameHUD: React.FC = () => {
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
        <div className='flex flex-col items-center gap-2'>
          <MoveCounter />
          <PickLootButton />
          <PickChestButton />
        </div>
      </div>
      <div className='absolute left-0 flex h-screen items-center justify-center'>
        <EnemyList />
      </div>
      <div className='absolute right-0 flex h-screen items-center justify-center'>
        <LootList />
      </div>
      <PlayerList />
      <TurnAnnounceDialog ref={turnAnnouncer} />
      <FightAnnounceDialog ref={fightAnnouncer} onAttack={launchAttack} />
    </>
  )
}
