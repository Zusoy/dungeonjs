import { z } from 'zod'

export const VectorSchema = z.tuple([z.number(), z.number(), z.number()])
export type VectorTuple = z.infer<typeof VectorSchema>
