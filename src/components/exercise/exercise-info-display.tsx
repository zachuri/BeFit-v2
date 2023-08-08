import React from "react"

import { Exercises } from "@/types/exercise"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface Props {
  exercises: Exercises[]
}

export default function ExerciseInfoDisplay({ exercises }: Props) {
  return (
    <>
      <div className="grid grid-cols-3">
        {exercises.map((exercise) => {
          return (
            <Card>
              <CardHeader>
                <CardTitle>{exercise.name}</CardTitle>
                <CardTitle>{exercise.equipment}</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
