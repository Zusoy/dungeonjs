import React from 'react'
import { moveToCoords, selectCurrentPlayer, selectIsPlayerTurn, selectTiles } from 'features/Game/slice'
import { useDispatch, useSelector } from 'react-redux'
import { Vector3 } from 'three'
import { Coords, VectorTuple } from 'services/socket'
import { ITile } from 'features/Game/Tile/type'
import { Nullable } from 'utils'

const MoveControls: React.FC = () => {
  const dispatch = useDispatch()
  const playerTurn = useSelector(selectIsPlayerTurn)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const tiles = useSelector(selectTiles)
  const [controlsEnabled, toggleControls] = React.useState<boolean>(true)

  React.useEffect(() => {
    if (controlsEnabled) {
      return
    }

    const toggleControlsTimeout = setTimeout(() => {
      toggleControls(true)
    }, 4500)

    return () => {
      clearTimeout(toggleControlsTimeout)
    }
  }, [controlsEnabled])

  const currentTile = React.useMemo<Nullable<ITile>>(() => {
    return tiles.find(tile => tile.coords[0] === currentPlayer.coords[0] && tile.coords[1] === currentPlayer.coords[1]) || null
  }, [currentPlayer, tiles])

  const dispatchMove = React.useCallback((direction: VectorTuple) => {
    if (!currentTile || !controlsEnabled) {
      return
    }

    toggleControls(false)

    const coords: Coords = [
      currentTile.coords[0] + direction[0],
      currentTile.coords[1] + direction[2]
    ]

    const uncharted = !tiles.find(tile => tile.coords[0] === coords[0] && tile.coords[1] === coords[1])

    dispatch(moveToCoords({
      coords,
      fromDirection: direction,
      uncharted
    }))
  }, [dispatch, currentTile, controlsEnabled, tiles])

  const tilePosition = React.useMemo<Vector3>(
    () => currentTile ? new Vector3(currentTile.coords[0] * 8, 0, currentTile.coords[1] * 8) : new Vector3(0, 0, 0),
    [currentTile]
  )

  if (!playerTurn || !currentTile) {
    return null
  }

  return (
    <>
    {currentTile.directions.map(
      direction =>
        <arrowHelper
          args={[
            new Vector3(direction[0], direction[1], direction[2]),
            new Vector3(tilePosition.x + direction[0], 1, tilePosition.z + direction[2]),
            2,
            controlsEnabled ? 'green' : 'red',
            2,
            1
          ]}
          onClick={() => dispatchMove(direction)}
        />
    )}
    </>
  )
}

export default MoveControls
