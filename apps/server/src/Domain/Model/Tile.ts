import { z } from 'zod'
import { VectorSchema } from 'Domain/Geometry/Vector'
import { ScalarCoordsSchema } from 'Domain/Geometry/Coords'

export const TileTypeSchema = z.literal(['corridor', 'room'])
export type TileType = z.infer<typeof TileTypeSchema>

export const TileSchema = z.object({
  id: z.string().nonempty(),
  type: TileTypeSchema,
  coords: ScalarCoordsSchema,
  directions: z.array(VectorSchema)
})

export type Tile = z.infer<typeof TileSchema>
