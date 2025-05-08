import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Selector } from 'app/store'
import type { Nullable } from 'types/utils'

export type LeftRoomReason = 'user_left'|'room_deleted'
export type JoinRoomErrorCode = 'room_not_found'

export enum RoomStatus {
  Initial = 'initial',
  Joining = 'joining',
  Joined = 'joined',
  Leaving = 'leaving',
  Error = 'error'
}

export type State = {
  currentRoomId: Nullable<string>
  status: RoomStatus
}

export const initialState: State = {
  status: RoomStatus.Initial,
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
    joined: (state, action: PayloadAction<string>) => ({
      ...state,
      currentRoomId: action.payload,
      status: RoomStatus.Joined
    }),
    leave: (state, _action: PayloadAction<LeaveRoomPayload>) => ({
      ...state,
      status: RoomStatus.Leaving
    }),
    left: (state, _action: PayloadAction<LeftRoomReason>) => ({
      ...state,
      currentRoomId: null,
      status: RoomStatus.Initial
    }),
    error: state => ({
      ...state,
      currentRoomId: null,
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

export type RoomActions =
  ReturnType<typeof create> |
  ReturnType<typeof join> |
  ReturnType<typeof joined> |
  ReturnType<typeof leave> |
  ReturnType<typeof left> |
  ReturnType<typeof error>

export default slice
