import { Database } from "./supabase.db"

export type Exercises = Database["public"]["Tables"]["exercises"]["Row"]
export type Exercise = Database["public"]["Tables"]["exercise"]["Row"]
