import { createSupabaseServerClient } from "@/utils/supabase-server"

import { Exercise, Exercises } from "@/types/exercise"
import { Split, SplitGroup } from "@/types/split"
import { Weight } from "@/types/weight"

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

export async function getUserSplitById(
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

export async function getSplitName(id: string) {
  const supabase = createSupabaseServerClient()

  const { data } = await supabase
    .from("split")
    .select("name")
    .eq("id", id)
    .single()

  return data?.name as string
}

export async function getExercisesForSplit(
  user_id: string,
  id: string
): Promise<string[] | null> {
  const supabase = createSupabaseServerClient()

  const { data } = await supabase
    .from("exercise")
    .select("exercise_id")
    .eq("user_id", user_id)
    .contains("split_ids", [id])

  const exerciseIds = data ? data.map((exercise) => exercise.exercise_id) : []

  return exerciseIds as string[] | null
}

export async function getExercisesInfo(ids: string[]): Promise<Exercises[]> {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .in("id", ids)

  if (error) {
    console.error("Error fetching exercises:", error.message)
    throw error
  }

  return data as Exercises[]
}
