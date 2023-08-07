import React from "react"
import { createSupabaseBrowserClient } from "@/utils/supabase-client"

export async function generateStaticParams() {
  const supabase = createSupabaseBrowserClient()

  try {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      throw error
    }

    const { data: splits } = await supabase
      .from("split")
      .select("id")
      .eq("user_id", data.session?.user.id)

    return splits ?? []
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function Split({
  params,
}: {
  params: { split_id: string }
}) {
  const split_id = params.split_id[0]
  return <h1>{split_id}</h1>
}
