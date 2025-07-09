import { Selector } from 'app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RoomStatus } from 'features/Rooms/domain/status'
import type { Nullable } from 'types/utils'

export type LeftRoomReason = 'user_left'|'room_deleted'
export type JoinRoomErrorCode = 'room_not_found' | 'max_players'

export type State = {
  currentRoomId: Nullable<string>
  status: RoomStatus
  lastErrorReason: Nullable<JoinRoomErrorCode>
}

export const initialState: State = {
  status: RoomStatus.Initial,
  currentRoomId: null,
  lastErrorReason: null
}

export type CreateRoomPayload = {
  readonly roomId: string
}

export type JoinRoomPayload = {
  readonly roomId: string
}

export type JoinedRoomPayload = {
  readonly roomId: string
}

export type LeaveRoomPayload = {
  readonly roomId: string
}

export type LeftRoomPayload = {
  readonly reason: LeftRoomReason
}

export type FailedToJoinRoomPayload = {
  readonly roomId: string
  readonly code: JoinRoomErrorCode
}

const slice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    create: (state, _action: PayloadAction<CreateRoomPayload>) => ({
      ...state,
      status: RoomStatus.Joining
    }),
    join: (state, _action: PayloadAction<JoinRoomPayload>) => ({
      ...state,
      status: RoomStatus.Joining
    }),
    joined: (state, action: PayloadAction<JoinedRoomPayload>) => ({
      ...state,
      currentRoomId: action.payload.roomId,
      status: RoomStatus.Joined
    }),
    leave: (state, _action: PayloadAction<LeaveRoomPayload>) => ({
      ...state,
      status: RoomStatus.Leaving
    }),
    left: (state, _action: PayloadAction<LeftRoomPayload>) => ({
      ...state,
      currentRoomId: null,
      status: RoomStatus.Initial
    }),
    error: (state, action: PayloadAction<FailedToJoinRoomPayload>) => ({
      ...state,
      currentRoomId: null,
      lastErrorReason: action.payload.code,
      status: RoomStatus.Error
    })
  }
})

export const {
  create,
  join,
  joined,
  leave,
  left,
  error
} = slice.actions

export const selectCurrentRoomId: Selector<Nullable<string>> = state =>
  state.rooms.currentRoomId

export const selectIsInError: Selector<boolean> = state =>
  state.rooms.status === RoomStatus.Error

export const selectLastErrorCode: Selector<Nullable<JoinRoomErrorCode>> = state =>
  state.rooms.lastErrorReason

export type RoomActions =
  ReturnType<typeof create> |
  ReturnType<typeof join> |
  ReturnType<typeof joined> |
  ReturnType<typeof leave> |
  ReturnType<typeof left> |
  ReturnType<typeof error>

export default slice
