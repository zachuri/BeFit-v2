import { Database } from './supabase.db'

export type SplitGroup = Database["public"]["Tables"]["split_group"]["Row"]
export type Split = Database["public"]["Tables"]["split"]["Row"]
