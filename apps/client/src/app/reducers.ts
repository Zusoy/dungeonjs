import { combineReducers } from 'redux'
import auth from 'features/Authentication/slice'
import rooms from 'features/Rooms/slice'
import game from 'features/Game/slice'

export default combineReducers({
  auth: auth.reducer,
  rooms: rooms.reducer,
  game: game.reducer
})
