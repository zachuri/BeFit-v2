import React from "react"
import { notFound } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase-client"

import { getServerSession } from "@/lib/session"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ExerciseSearchDialog from "@/components/exercise/exercise-search-dialog"
import {
  getSplitName,
  getUserSplitById,
} from "@/app/(dashboard)/dashboard/actions"

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

  const session = await getServerSession()
  const split = await getUserSplitById(session.user.id, split_id)
  const name = await getSplitName(split_id)

  if (!split) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col justify-between gap-5">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{name}</h2>
          <ExerciseSearchDialog />
        </div>
        <div className="grid grid-cols-3">
          <Card>
            <CardHeader>Exercise</CardHeader>
          </Card>
        </div>
        {/* <ExerciseSearch /> */}
      </div>
    </div>
  )
}
