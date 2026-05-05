import { z } from 'zod'

export const KeySchema = z.object({
  id: z.string().nonempty()
})

export type Key = z.infer<typeof KeySchema>
