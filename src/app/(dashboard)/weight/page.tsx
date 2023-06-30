import React from "react"
import { createSupabaseServerClient } from "@/utils/supabase-server"

import { Weight } from "@/types/weight"
import { getServerSession } from "@/lib/session"
import { Card, CardTitle } from "@/components/ui/card"

import { WeightForm } from "./weight-form"

export async function getUserWeight(user_id: string): Promise<Weight[]> {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("weight")
    .select("*")
    .eq("user_id", user_id)

  if (error) {
    console.log(error)
  }

  return data as Weight[]
}

export default async function Page() {
  const session = await getServerSession()

  const weights = await getUserWeight(session.user.id)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Weight</h2>
      <WeightForm user_id={session.user.id} />
      {weights.map((weight) => {
        return (
          <Card>
            <CardTitle>{weight.weight}</CardTitle>
          </Card>
        )
      })}
    </div>
  )
}
