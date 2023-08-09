import React from "react"
import Image from "next/image"
import { notFound } from "next/navigation"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getExerciseInfo } from "@/app/(dashboard)/dashboard/actions"

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

      <Card>
        <CardHeader>
          <div className="flex flex-row">
            {exercise.images?.map((image, index) => (
              <Image
                src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${image}`}
                alt={image + index}
                height={100}
                width={100}
              />
            ))}
          </div>
          <CardTitle>Instructions</CardTitle>
          {exercise.instructions?.map((info) => (
            <CardDescription>{info}</CardDescription>
          ))}
        </CardHeader>
      </Card>
    </div>
  )
}
