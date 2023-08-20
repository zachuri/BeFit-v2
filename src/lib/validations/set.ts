import * as z from "zod"

export const setSchema = z.object({
  exercise_id: z.string().max(100),
  reps: z.coerce.number().positive(),
  weight: z.coerce.number().positive(),
})
