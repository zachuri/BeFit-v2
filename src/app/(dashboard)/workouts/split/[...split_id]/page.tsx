import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase-client"

import { getServerSession } from "@/lib/session"
import { Button } from "@/components/ui/button"
import ExerciseInfoDisplay from "@/components/exercise/exercise-info-display"
import ExerciseSearchDialog from "@/components/exercise/exercise-search-dialog"
import { Icons } from "@/components/icons"
import {
  getExercisesForSplit,
  getExercisesInfo,
  getSplitName,
  getUserSplitById,
} from "@/app/actions"

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
  const exercises = await getExercisesForSplit(session.user.id, split_id)

  // add check for if null
  const exerciseInfo = await getExercisesInfo(exercises as string[])

  if (!split) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col justify-between gap-5">
        <Link href="/workouts" className="mb-5">
          <Button variant={"secondary"}>
            <Icons.chevronLeft size={20} />
            Back
          </Button>
        </Link>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{name}</h2>
          <ExerciseSearchDialog split_id={split_id} />
        </div>
        <ExerciseInfoDisplay exercises={exerciseInfo} />
      </div>
    </div>
  )
}
