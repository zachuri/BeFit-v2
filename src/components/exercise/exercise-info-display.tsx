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
            <div className="flex flex-row items-center">
              <CardTitle className="text-sm">Primary:</CardTitle>
              {exercise.primary_muscles?.map((muscles, index) => (
                <CardDescription key={index} className="capitalize">
                  {muscles}
                </CardDescription>
              ))}
            </div>
            {exercise.secondary_muscles &&
              exercise.secondary_muscles.length > 0 && (
                <div className="flex flex-row items-center">
                  {/* Flex container */}
                  <CardTitle className="text-sm">Secondary: </CardTitle>
                  <CardDescription className="capitalize">
                    {exercise.secondary_muscles.join(", ")}
                  </CardDescription>
                </div>
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
