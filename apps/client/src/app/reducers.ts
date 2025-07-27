import { combineReducers } from 'redux'
import auth from 'features/Authentication/application/slice'
import rooms from 'features/Rooms/application/slice'
import lobby from 'features/Lobby/application/slice'
import dungeon from 'features/Game/Dungeon/application/slice'
import combat from 'features/Game/Combat/application/slice'

export default combineReducers({
  auth: auth.reducer,
  rooms: rooms.reducer,
  lobby: lobby.reducer,
  dungeon: dungeon.reducer,
  combat: combat.reducer,
})
