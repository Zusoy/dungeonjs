import React from 'react'
import { Coords } from 'types/coords'
import type { Tile } from 'types/tile'
import type { Nullable, VectorTuple } from 'types/utils'
import { useDispatch, useSelector } from 'react-redux'
import { Vector3 } from 'three'
import { moveToCoords, selectCurrentPlayer, selectIsPlayerTurn, selectTiles } from 'features/Game/slice'

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

  const currentTile = React.useMemo<Nullable<Tile>>(() => {
    const currentCoords = new Coords(currentPlayer.coords[0], currentPlayer.coords[1])
    return tiles.find(tile => Coords.fromScalar(tile.coords).equals(currentCoords)) || null
  }, [currentPlayer.coords, tiles])

  const dispatchMove = React.useCallback((direction: VectorTuple) => {
    if (!currentTile || !controlsEnabled) {
      return
    }

    toggleControls(false)

    const targetCoords = new Coords(
      currentTile.coords[0] + direction[0],
      currentTile.coords[1] + direction[2]
    )

    const neighborTiles = tiles.filter(
      tile => {
        const coords = Coords.fromScalar(tile.coords)

        return [
          Coords.fromScalar([-1, 0]),
          Coords.fromScalar([1, 0]),
          Coords.fromScalar([0, 1]),
          Coords.fromScalar([0, -1])
        ].some(coord => coords.equals(targetCoords.sum(coord)))
      }
    )

    const uncharted = !tiles.find(tile => Coords.fromScalar(tile.coords).equals(targetCoords))

    dispatch(moveToCoords({
      coords: targetCoords.toScalar(),
      fromDirection: direction,
      neighborTiles,
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
            onClick={e => {
              e.stopPropagation()
              dispatchMove(direction)
            }}
          />
      )}
    </>
  )
}

export default MoveControls
