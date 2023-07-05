import { Weight } from '@/types/weight'
import { createSupabaseServerClient } from '@/utils/supabase-server'

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