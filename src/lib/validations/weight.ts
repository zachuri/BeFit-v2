import * as z from "zod"

export const weightSchema = z.object({
  weight: z.string().max(32),
  description: z.string().max(200),
  weight_url: z.string().min(1).max(150),
  user_id: z.string().uuid().nullable(),
})
