import React from "react"
import { notFound } from "next/navigation"

import ExerciseSingleDisplay from "@/components/exercise/exercise-single-display"
import { getExerciseInfo } from "@/app/actions"

export default async function Exercise({
  params,
}: {
  params: { exercise_id: string }
}) {
  const exercise_id = params.exercise_id

  const exercise = await getExerciseInfo(exercise_id)

  if (!exercise) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">{exercise.name}</h2>
      <ExerciseSingleDisplay exercise={exercise} />
    </div>
  )
}
