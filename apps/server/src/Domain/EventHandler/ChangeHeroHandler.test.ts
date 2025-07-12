import 'reflect-metadata'
import { describe, test, expect } from 'vitest'
import { ChangeHeroHandler } from 'Domain/EventHandler/ChangeHeroHandler'
import { MockedPlayers } from 'Application/Repository/MockedPlayers'
import { createPlayerMock } from 'test-utils'
import { MockedPlayerBroadcaster } from 'Application/Notification/MockedPlayerBroadcaster'
import { MockedRooms } from 'Application/Repository/MockedRooms'
import { ChangeHeroEvent } from 'Domain/Event/ChangeHeroEvent'
import { MockedSocket } from 'Infra/Websocket/MockedSocket'
import { Room } from 'Domain/Model/Room'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'

describe('EventHandler/ChangeHero', () => {
  test('throws not authorized in not joined room', () => {
    const players = new MockedPlayers([ createPlayerMock('player_1', 'username') ])
    const rooms = new MockedRooms([])
    const socket = new MockedSocket('player_1', null)
    const broadcaster = new MockedPlayerBroadcaster()

    const event: ChangeHeroEvent = {
      hero: 'knight'
    }

    const handler = new ChangeHeroHandler(players, rooms, broadcaster)
    expect(() => handler.handle('changeHero', socket, event)).toThrow(new PlayerNotInRoomError('player_1'))
  })

  test('updates player hero and broadcast changes in room', () => {
    const players = new MockedPlayers([ createPlayerMock('player_1', 'username') ])
    const rooms = new MockedRooms([new Room('game', 'player_1')])
    const socket = new MockedSocket('player_1', 'game')
    const broadcaster = new MockedPlayerBroadcaster()

    const event: ChangeHeroEvent = {
      hero: 'knight'
    }

    const handler = new ChangeHeroHandler(players, rooms, broadcaster)
    handler.handle('changeHero', socket, event)

    const player = players.find('player_1')

    expect(player).not.toBeNull()
    expect(player?.hero).toBe('knight')
    expect(broadcaster.broadcastedRooms.includes('game')).toBeTruthy()
  })
})
