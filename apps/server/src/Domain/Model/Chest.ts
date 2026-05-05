import { z } from 'zod'
import { ScalarCoordsSchema } from 'Domain/Geometry/Coords'

export const ChestSchema = z.object({
  id: z.string().nonempty(),
  coords: ScalarCoordsSchema
})

export type Chest = z.infer<typeof ChestSchema>
