import * as z from "zod"

export const weightSchema = z.object({
  weight: z.string().max(32),
  description: z.string().max(200),
  // weight_url: z.string().max(150),
  weight_url: z.custom((value) => {
    if (value instanceof File) {
      // File validation logic here (e.g., file size, file type)
      return true // Return true if the file is valid
    } else {
      return "Invalid file" // Return an error message if the value is not a File object
    }
  }),
  user_id: z.string().uuid().nullable(),
})
