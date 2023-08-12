import { createSupabaseServerClient } from "@/utils/supabase-server"

import { Exercises } from "@/types/exercise"
// Actions for getting profile data from supabase
import { Profile } from "@/types/profile"
import { Split, SplitGroup } from "@/types/split"
import { Weight } from "@/types/weight"

export const getUserProfile = async (user_id: string): Promise<Profile> => {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user_id)
    .single()

  if (error) {
    console.log(error)
  }

  return data as Profile
}

export const getUserWeight = async (
  user_id: string
): Promise<Weight> => {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("weight")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.log(error)
  }

  return (data as Weight) || null
}

export const getUserWeights = async (user_id: string): Promise<Weight[]> => {
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

export const getUserGroupSplits = async (
  user_id: string
): Promise<SplitGroup[]> => {
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

export const getUserSplits = async (user_id: string): Promise<Split[]> => {
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

export const getUserSplitsById = async (
  user_id: string,
  split_id: string
): Promise<Split[]> => {
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

export const getSplitGroupName = async (id: string) => {
  const supabase = createSupabaseServerClient()

  const { data } = await supabase
    .from("split_group")
    .select("name")
    .eq("id", id)
    .single()

  return data?.name as string
}

export const getUserSplitById = async (
  user_id: string,
  split_id: string
): Promise<Split[]> => {
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

export const getSplitName = async (id: string) => {
  const supabase = createSupabaseServerClient()

  const { data } = await supabase
    .from("split")
    .select("name")
    .eq("id", id)
    .single()

  return data?.name as string
}

export const getExercisesForSplit = async (
  user_id: string,
  id: string
): Promise<string[] | null> => {
  const supabase = createSupabaseServerClient()

  const { data } = await supabase
    .from("exercise")
    .select("exercise_id")
    .eq("user_id", user_id)
    .contains("split_ids", [id])

  const exerciseIds = data ? data.map((exercise) => exercise.exercise_id) : []

  return exerciseIds as string[] | null
}

export const getExercisesInfo = async (ids: string[]): Promise<Exercises[]> => {
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

export const getExerciseInfo = async (id: string): Promise<Exercises> => {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching exercises:", error.message)
    throw error
  }

  return data as Exercises
}
