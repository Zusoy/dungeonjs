import React from 'react'
import { moveToCoords, selectCurrentTile, selectIsPlayerTurn } from 'features/Game/slice'
import { useDispatch, useSelector } from 'react-redux'
import { Vector3 } from 'three'
import { Coords, VectorTuple } from 'services/socket'

const MoveControls: React.FC = () => {
  const dispatch = useDispatch()
  const playerTurn = useSelector(selectIsPlayerTurn)
  const currentTile = useSelector(selectCurrentTile)
  const [controlsEnabled, enableControls] = React.useState<boolean>(true)

  const dispatchMove = React.useCallback((direction: VectorTuple) => {
    if (!controlsEnabled) {
      return
    }

    enableControls(false)

    const coords: Coords = [
      currentTile.coords[0] + direction[0],
      currentTile.coords[1] + direction[2]
    ]

    dispatch(moveToCoords({
      coords,
      fromDirection: direction,
      uncharted: true // todo
    }))
  }, [dispatch, currentTile, controlsEnabled])

  const tilePosition = React.useMemo<Vector3>(
    () => new Vector3(currentTile.coords[0] * 8, 0, currentTile.coords[1] * 8),
    [currentTile]
  )

  if (!playerTurn) {
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
