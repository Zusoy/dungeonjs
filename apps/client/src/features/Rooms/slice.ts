import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Selector } from 'app/store'
import { LeftRoomReason } from 'services/socket'
import type { Nullable } from 'types/utils'

export type State = {
  rooms: string[]
  currentRoomId: Nullable<string>
}

export const initialState: State = {
  rooms: [],
  currentRoomId: null
}

export type CreateRoomPayload = {
  readonly roomId: string
}

export type JoinRoomPayload = {
  readonly roomId: string
}

export type LeaveRoomPayload = {
  readonly roomId: string
}

const slice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    create: (state, _action: PayloadAction<CreateRoomPayload>) => ({
      ...state,
    }),
    join: (state, _action: PayloadAction<JoinRoomPayload>) => ({
      ...state,
    }),
    joined: (state, action: PayloadAction<string>) => ({
      ...state,
      currentRoomId: action.payload
    }),
    leave: (state, _action: PayloadAction<LeaveRoomPayload>) => ({
      ...state,
    }),
    left: (state, _action: PayloadAction<LeftRoomReason>) => ({
      ...state,
      currentRoomId: null
    }),
    received: (state, action: PayloadAction<string[]>) => ({
      ...state,
      rooms: action.payload
    }),
    error: state => ({
      ...state,
      currentRoomId: null,
      rooms: []
    })
  }
})

export const {
  create,
  join,
  joined,
  leave,
  left,
  received,
  error
} = slice.actions

export const selectCurrentRoomId: Selector<Nullable<string>> = state =>
  state.rooms.currentRoomId

export const selectRooms: Selector<string[]> = state =>
  state.rooms.rooms

export type RoomActions =
  ReturnType<typeof create> |
  ReturnType<typeof join> |
  ReturnType<typeof joined> |
  ReturnType<typeof leave> |
  ReturnType<typeof left> |
  ReturnType<typeof received> |
  ReturnType<typeof error>

export default slice
