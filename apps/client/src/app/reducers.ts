import { combineReducers } from 'redux'
import auth from 'features/Authentication/application/slice'
import rooms from 'features/Rooms/application/slice'
import lobby from 'features/Lobby/application/slice'
import game from 'features/Game/application/slice'

export default combineReducers({
  auth: auth.reducer,
  rooms: rooms.reducer,
  lobby: lobby.reducer,
  game: game.reducer
})
