import { eventChannel } from 'redux-saga'
import { combatEngaged, combatResolved } from 'features/Game/Combat/application/slice'
import type { SocketChannel, AppSocket } from 'services/socket'
import type {
  CombatActions,
  EngageCombatPayload,
  CombatResolvedPayload
} from 'features/Game/Combat/application/slice'

const combatChannel: SocketChannel<CombatActions> = (socket: AppSocket) => {
  return eventChannel(emitter => {
    const onCombatEngagedListener = (payload: EngageCombatPayload) => {
      emitter(combatEngaged(payload))
    }

    const onCombatResolvedListener = (payload: CombatResolvedPayload) => {
      emitter(combatResolved(payload))
    }

    socket.on('engageCombat', onCombatEngagedListener)
    socket.on('combatResolved', onCombatResolvedListener)

    return () => {
      socket.off('engageCombat', onCombatEngagedListener)
      socket.off('combatResolved', onCombatResolvedListener)
    }
  })
}

export default combatChannel
