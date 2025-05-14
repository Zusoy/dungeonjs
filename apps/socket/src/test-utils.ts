import { Player } from 'Domain/Model/Player'

export const createPlayerMock = (id: string, username: string): Player => {
  return new Player(
    id,
    username,
    '#ffff',
    'barbarian',
    { weapons: [], treasures: 0 },
    [0, 0, 0],
    [0, 0, 0],
    [0, 0],
    4
  )
}
