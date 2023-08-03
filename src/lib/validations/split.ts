import * as z from "zod"

export const splitGroupSchema = z.object({
  name: z.string().max(32),
  user_id: z.string().uuid().nullable(),
})

export const splitSchema = z.object({
  name: z.string().max(32),
  user_id: z.string().uuid().nullable(),
  split_group_id: z.string().uuid().nullable(),
  muscle_targets: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
})
