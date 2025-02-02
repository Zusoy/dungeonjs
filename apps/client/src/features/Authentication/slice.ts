import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Selector } from 'app/store'
import { Nullable } from 'utils'

export enum AuthStatus {
  Offline = 'offline',
  Connecting = 'connecting',
  Connected = 'connected',
  Disconnecting = 'disconnecting',
  Error = 'error'
}

export type State = {
  id: Nullable<string>
  username: Nullable<string>
  status: AuthStatus
}

export const initialState: State = {
  id: null,
  username: null,
  status: AuthStatus.Offline
}

export type ConnectPayload = {
  readonly username: string
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<ConnectPayload>) => ({
      ...state,
      username: action.payload.username,
      status: AuthStatus.Connecting
    }),
    connected: (state, action: PayloadAction<string>) => ({
      ...state,
      id: action.payload,
      status: AuthStatus.Connected
    }),
    disconnect: state => ({
      ...state,
      status: AuthStatus.Disconnecting
    }),
    disconnected: state => ({
      ...state,
      status: AuthStatus.Offline,
      id: null,
      username: null
    }),
    error: state => ({
      ...state,
      id: null,
      username: null,
      status: AuthStatus.Error
    })
  }
})

export const {
  connect,
  connected,
  disconnect,
  disconnected,
  error
} = slice.actions

export const selectIsConnected: Selector<boolean> = state =>
  state.auth.status === AuthStatus.Connected && state.auth.id !== null

export const selectId: Selector<State['id']> = state =>
  state.auth.id

export default slice
