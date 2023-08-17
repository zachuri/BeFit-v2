import * as z from "zod"

export const setSchema = z.object({
  exercise_id: z.string().max(100),
  reps: z.number(),
  weight: z.number(),
  user_id: z.string().uuid().nullable(),
})
