import React from 'react'
import ModularRoom from 'features/Game/Dungeon/presentation/GameObject/Tile/ModularRoom'
import Corridor from 'features/Game/Dungeon/presentation/GameObject/Tile/Corridor'
import { TileType } from 'types/tile'
import type { VectorTuple } from 'types/utils'

type Props = JSX.IntrinsicElements['group'] & {
  readonly type: TileType
  readonly directions: VectorTuple[]
}

const Tile: React.FC<Props> = props => {
  if (props.type === TileType.Room) {
    return (
      <ModularRoom {...props} />
    )
  }

  if (props.type === TileType.Corridor) {
    return (
      <Corridor {...props} />
    )
  }
}

export default Tile
