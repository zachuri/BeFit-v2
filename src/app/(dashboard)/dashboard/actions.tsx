import { createSupabaseServerClient } from "@/utils/supabase-server"

import { Database } from "@/types/supabase.db"
import { Weight } from "@/types/weight"

export type SplitGroup = Database["public"]["Tables"]["split_group"]["Row"]
export type Split = Database["public"]["Tables"]["split"]["Row"]

export async function getUserWeight(user_id: string): Promise<Weight[]> {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("weight")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false })

  if (error) {
    console.log(error)
  }

  return data as Weight[]
}

export async function getUserGroupSplits(
  user_id: string
): Promise<SplitGroup[]> {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("split_group")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false })

  if (error) {
    console.log(error)
  }

  return data as SplitGroup[]
}

export async function getUserSplits(user_id: string): Promise<Split[]> {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("split")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: true })

  if (error) {
    console.log(error)
  }

  return data as Split[]
}

export async function getUserSplitsById(
  user_id: string,
  split_id: string
): Promise<Split[]> {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("split")
    .select("*")
    .eq("user_id", user_id)
    .eq("split_group_id", split_id)
    .order("created_at", { ascending: true })

  if (error) {
    console.log(error)
  }

  return data as Split[]
}

export async function getSplitGroupName(id: string) {
  const supabase = createSupabaseServerClient()

  const { data } = await supabase
    .from("split_group")
    .select("name")
    .eq("id", id)
    .single()

  return data?.name as string
}
