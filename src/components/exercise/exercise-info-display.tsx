"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible"

import { Exercises } from "@/types/exercise"

import { Button } from "../ui/button"
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
            {exercise.primary_muscles?.map((muscles, index) => (
              <CardDescription key={index} className="capitalize">
                {muscles}
              </CardDescription>
            ))}
            {exercise.secondary_muscles &&
              exercise.secondary_muscles.length > 0 && (
                <>
                  <CardDescription className="capitalize">
                    {exercise.secondary_muscles.join(", ")}
                  </CardDescription>
                </>
              )}
          </CardHeader>
          <CardContent>
            <Link href={`/workouts/exercise_info/${exercise.id}`}>
              <Button variant={"outline"}>More Info</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
