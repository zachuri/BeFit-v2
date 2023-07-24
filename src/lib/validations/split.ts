import * as z from "zod"

export const splitSchema = z.object({
  name: z.string().max(32),
  user_id: z.string().uuid().nullable(),
})
