import React from 'react'
import type { CombatAnnouncer } from 'features/Game/Combat/presentation/HUD/CombatAnnounceDialog'
import { attack, combatEnded, CombatStatus, selectCombatOriginCoords, selectCombatResult, selectCombatStatus, selectFightingEnemy, selectFightingPlayer } from 'features/Game/Combat/application/slice'
import { CombatAnnounceDialog } from 'features/Game/Combat/presentation/HUD/CombatAnnounceDialog'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentPlayer } from 'features/Game/Dungeon/application/slice'

export const CombatHUD: React.FC = () => {
  const dispatch = useDispatch()
  const combatAnnouncer = React.useRef<CombatAnnouncer>(null!)
  const combatStatus = useSelector(selectCombatStatus)
  const fightingPlayer = useSelector(selectFightingPlayer)
  const fightingEnemy = useSelector(selectFightingEnemy)
  const localPlayer = useSelector(selectCurrentPlayer)
  const combatOriginCoords = useSelector(selectCombatOriginCoords)
  const combatResult = useSelector(selectCombatResult)

  const dispatchAttack = React.useCallback(() => {
    if (!fightingEnemy || !combatOriginCoords) {
      return
    }

    dispatch(attack({ enemyId: fightingEnemy.id, originCoords: combatOriginCoords }))
  }, [fightingEnemy, combatOriginCoords, dispatch])

  const dispatchCombatEnd = React.useCallback(() => {
    dispatch(combatEnded())
  }, [dispatch])

  React.useEffect(() => {
    if (combatStatus === CombatStatus.None) {
      combatAnnouncer.current.close()
      return
    }

    if (combatStatus === CombatStatus.Engaged) {
      combatAnnouncer.current.announce({
        hero: fightingPlayer!.hero,
        enemy: fightingEnemy!.type,
        enemyDefense: fightingEnemy!.defense,
        control: localPlayer.id === fightingPlayer!.id,
      })
    }
  }, [fightingPlayer, fightingEnemy, localPlayer, combatStatus])

  React.useEffect(() => {
    if (!combatResult) {
      return
    }

    combatAnnouncer.current.resolve({
      firstDiceResult: combatResult.firstDiceResult,
      secondDiceResult: combatResult.secondDiceResult,
      succeed: combatResult.succeed,
      inventoryBonus: combatResult.inventoryBonus
    })
  }, [combatResult])

  return (
    <>
      <CombatAnnounceDialog
        ref={combatAnnouncer}
        onCombatEnd={dispatchCombatEnd}
        onAttack={dispatchAttack}
      />
    </>
  )
}
