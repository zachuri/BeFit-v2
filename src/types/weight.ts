import { Database } from "./supabase.db"

export type Weight = Database["public"]["Tables"]["weight"]["Row"]
