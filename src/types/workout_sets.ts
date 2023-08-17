import { Database } from "./supabase.db"

export type WorkoutSets = Database["public"]["Tables"]["workout_sets"]["Row"]
