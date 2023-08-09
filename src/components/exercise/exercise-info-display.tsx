"use client"

import React from "react"
import Image from "next/image"

import { Exercises } from "@/types/exercise"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

interface Props {
  exercises: Exercises[]
}

export default function ExerciseInfoDisplay({ exercises }: Props) {
  return (
    <div className="grid grid-cols-2 gap-5">
      {exercises.map((exercise, exerciseIndex) => (
        <Card key={exerciseIndex}>
          <CardHeader>
            <CardTitle className="text-lg">{exercise.name}</CardTitle>
            <CardDescription className="capitalize">
              {exercise.equipment}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-sm">Primary Muscles</CardTitle>
            {exercise.primary_muscles?.map((muscles, index) => (
              <CardDescription key={index} className="capitalize">
                {muscles}
              </CardDescription>
            ))}
            {exercise.secondary_muscles &&
              exercise.secondary_muscles.length > 0 && (
                <>
                  <CardTitle className="text-sm">Secondary Muscles</CardTitle>
                  <CardDescription className="capitalize">
                    {exercise.secondary_muscles.join(", ")}
                  </CardDescription>
                </>
              )}
            <CardTitle className="text-sm">Images</CardTitle>
            <div className="flex flex-row">
              {exercise.images?.map((image, index) => (
                <Image
                  key={index}
                  src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${image}`}
                  alt=""
                  width={100}
                  height={100}
                />
              ))}
            </div>
            {exercise.instructions && exercise.instructions.length > 0 && (
              <>
                <CardTitle className="text-sm">Instructions</CardTitle>
                <div className="flex flex-col space-y-5">
                  {exercise.instructions.map((instruction, index) => (
                    <CardDescription key={index} className="capitalize">
                      {instruction}
                    </CardDescription>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
