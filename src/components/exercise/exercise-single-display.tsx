"use client"

import React from "react"
import Image from "next/image"

import { Exercises } from "@/types/exercise"

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"

interface Props {
  exercise: Exercises
}

export default function ExerciseSingleDisplay({ exercise }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{exercise.name}</CardTitle>
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
  )
}
