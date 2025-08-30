import 'reflect-metadata'
import { describe, test, expect } from 'vitest'
import { NewGameHandler } from 'Domain/EventHandler/NewGameHandler'
import { MockedPlayers } from 'Application/Repository/MockedPlayers'
import { MockedRooms } from 'Application/Repository/MockedRooms'
import { MockedTurnAllocator } from 'Application/Notification/MockedTurnAllocator'
import { MockedServer } from 'Infra/Websocket/MockedServer'
import { MockedSocket } from 'Infra/Websocket/MockedSocket'
import { NewGameEvent } from 'Domain/Event/NewGameEvent'
import { PlayerNotInRoomError } from 'Domain/Error/PlayerNotInRoomError'
import { ObjectNotFoundError } from 'Domain/Error/ObjectNotFoundError'
import { createPlayerMock } from 'test-utils'
import { Room } from 'Domain/Model/Room'
import { Golem } from 'Domain/Model/Skeleton'
import { WeaponLoot } from 'Domain/Model/Loot'
import { Dagger } from 'Domain/Model/Weapon'

describe('EventHandler/NewGame', () => {
  test('throws not authorized when not joined room', async () => {
    const rooms = new MockedRooms([])
    const players = new MockedPlayers([])
    const server = new MockedServer([])
    const turnAllocator = new MockedTurnAllocator()
    const event = new NewGameEvent()
    const socket = new MockedSocket('playerId', null)

    const handler = new NewGameHandler(rooms, players, server, turnAllocator)
    await expect(handler.handle('newGame', socket, event)).rejects.toThrow(new PlayerNotInRoomError('playerId'))
  })

  test('throws when room not found', async () => {
    const rooms = new MockedRooms([])
    const players = new MockedPlayers([])
    const server = new MockedServer([])
    const turnAllocator = new MockedTurnAllocator()
    const event = new NewGameEvent()
    const socket = new MockedSocket('playerId', 'roomId')

    const handler = new NewGameHandler(rooms, players, server, turnAllocator)
    await expect(handler.handle('newGame', socket, event)).rejects.toThrow(new ObjectNotFoundError('Room', 'roomId'))
  })

  test('should reset all players and room, then allocate first turn', async () => {
    const player1 = createPlayerMock('player1', 'username1', [1, 1])
    const player2 = createPlayerMock('player2', 'username2', [2, 2])
    const players = new MockedPlayers([player1, player2])
    const room = new Room('roomId', 'player1')
    room.addEnemy(new Golem('golem', [1, 2], new WeaponLoot(new Dagger('dagger'))))
    room.addChest({ id: 'chest', coords: [1, 4] })

    const rooms = new MockedRooms([room])
    const server = new MockedServer(['player1', 'player2'])
    const turnAllocator = new MockedTurnAllocator()
    const event = new NewGameEvent()
    const socket = new MockedSocket('player1', 'roomId')

    const handler = new NewGameHandler(rooms, players, server, turnAllocator)
    await handler.handle('newGame', socket, event)

    const updatedPlayer1 = players.find('player1')
    const updatedPlayer2 = players.find('player2')
    const updatedRoom = rooms.find('roomId')

    expect(updatedPlayer1).not.toBeNull()
    expect(updatedPlayer2).not.toBeNull()
    expect(updatedRoom).not.toBeNull()

    expect(updatedPlayer1!.coords).toStrictEqual([0, 0])
    expect(updatedPlayer2!.coords).toStrictEqual([0, 0])
    expect(room!.getEnemies()).toHaveLength(0)
    expect(room!.getChests()).toHaveLength(0)
  })
})