"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { createSupabaseBrowserClient } from "@/utils/supabase-client"

import { Database } from "@/types/supabase.db"
import { Input } from "@/components/ui/input"

import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"

export type Exercises = Database["public"]["Tables"]["exercises"]["Row"]

const ExerciseSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [exerciseList, setExerciseList] = useState<Exercises[]>([])
  const [selectedExercises, setSelectedExercises] = useState<Exercises[]>([])

  // to be able to call rpc custom function for searching exercise
  const supabase = createSupabaseBrowserClient()

  const handleSearch = async () => {
    try {
      // Make a request to fetch exercises based on the search query
      //@ts-ignore
      const { data, error } = await supabase.rpc("search_exercise", {
        exercise_name: searchQuery,
      })

      if (error) {
        console.error("Error fetching exercises:", error.message)
      } else {
        // @ts-ignore
        setExerciseList(data)
        console.log(data)
      }
    } catch (error) {
      console.error("Error fetching exercises:", error)
    }
  }

  const handleExerciseSelect = (exercise: Exercises) => {
    // Check if the exercise is already in the selectedExercises list
    const isDuplicate = selectedExercises.some(
      (selectedExercise) => selectedExercise.id === exercise.id
    )

    if (!isDuplicate) {
      setSelectedExercises((prevSelectedExercises) => [
        ...prevSelectedExercises,
        exercise,
      ])
    }
  }

  const handleExerciseRemove = (exercise: Exercises) => {
    setSelectedExercises((prevSelectedExercises) =>
      prevSelectedExercises.filter(
        (selectedExercise) => selectedExercise.id !== exercise.id
      )
    )
  }

  // Call handleSearch on every change of searchQuery
  useEffect(() => {
    handleSearch()
  }, [searchQuery])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Exercise</CardTitle>
        <CardDescription>
          Please select and search for exercises
        </CardDescription>
        <Input
          type="search"
          placeholder="Search for exercises"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery.length > 0 && (
          <ScrollArea className="h-[175px] rounded-md border p-4">
            <ul>
              {exerciseList
                .filter((data) => {
                  return data.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                })
                .map((exercise) => (
                  <Button
                    key={exercise.id}
                    className="w-full"
                    variant={"ghost"}
                    onClick={() => handleExerciseSelect(exercise)}
                  >
                    <div>
                      <li>{exercise.name}</li>
                    </div>
                  </Button>
                ))}
            </ul>
          </ScrollArea>
        )}
      </CardHeader>
      <CardHeader>
        <div className="mt-5">
          {selectedExercises.length > 0 ? (
            <>
              <CardTitle>Selected</CardTitle>
              <CardDescription>
                Exercises will be added to split.
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle>None Selected</CardTitle>
              <CardDescription>
                Please search and select exercise to add to split.
              </CardDescription>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {selectedExercises.length > 0 && (
          <ScrollArea className="mt-5 h-[100px] rounded-md border p-4">
            <ul>
              {selectedExercises.map((exercise) => (
                <Button
                  key={exercise.id}
                  className="w-full"
                  variant={"ghost"}
                  onClick={() => handleExerciseRemove(exercise)}
                >
                  <li key={exercise.id}>{exercise.name}</li>
                </Button>
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

export default ExerciseSearch
