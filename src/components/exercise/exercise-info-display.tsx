"use client"

import React from "react"
import Link from "next/link"

import { Exercises } from "@/types/exercise"

import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { ExerciseDeleteSplitDialog } from "./exercise-delete-split-dialog"

interface Props {
  split_id: string
  exercises: Exercises[]
}

export default function ExerciseInfoDisplay({ split_id, exercises }: Props) {
  return (
    <>
      {exercises.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {exercises.map((exercise, exerciseIndex) => (
            <Card key={exerciseIndex}>
              <CardHeader>
                <section className="grid grid-cols-6">
                  <Link
                    className="col-span-5"
                    href={`/workouts/sets/${split_id}/${exercise.id}`}
                  >
                    <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    <div className="flex flex-row items-center space-x-1">
                      <CardTitle className="text-sm">Primary:</CardTitle>
                      {exercise.primary_muscles?.map((muscles, index) => (
                        <CardDescription key={index} className="capitalize">
                          {muscles}
                        </CardDescription>
                      ))}
                    </div>
                    {exercise.secondary_muscles &&
                      exercise.secondary_muscles.length > 0 && (
                        <div className="flex flex-row items-center space-x-1">
                          {/* Flex container */}
                          <CardTitle className="text-sm">Secondary: </CardTitle>
                          <CardDescription className="capitalize">
                            {exercise.secondary_muscles.join(", ")}
                          </CardDescription>
                        </div>
                      )}
                  </Link>
                  <div className="flex justify-end text-red-400">
                    <ExerciseDeleteSplitDialog split_id={split_id} exercise_id={exercise.id} />
                  </div>
                </section>
              </CardHeader>
              <CardContent>
                <Link href={`/workouts/exercise_info/${exercise.id}`}>
                  <Button variant={"outline"}>More Info</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <CardHeader>
          <CardTitle>No exercises added!</CardTitle>
          <CardDescription>Please add exercises to split!</CardDescription>
        </CardHeader>
      )}
    </>
  )
}
