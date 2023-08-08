"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { createSupabaseBrowserClient } from "@/utils/supabase-client"

import { Database } from "@/types/supabase.db"
import { Input } from "@/components/ui/input"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"

export type Exercises = Database["public"]["Tables"]["exercises"]["Row"]

const ExerciseSearchDialog = () => {
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

  // Call handleSearch on every change of searchQuery
  useEffect(() => {
    handleSearch()
  }, [searchQuery])

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

  const handleSubmit = () => {
    // Make sure to check there are no duplicate exercises in exisiting split
    // Submit and link this exercise to this split
    return
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Icons.add className="mr-2" />
          Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Exercise</DialogTitle>
          <DialogDescription>
            Select Exercises that are part of the split
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            type="search"
            placeholder="Search for exercises"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery.length > 0 && (
            <ScrollArea className="h-[125px] rounded-md border p-4">
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

          <div className="mt-5">
            <DialogHeader>
              {selectedExercises.length > 0 ? (
                <>
                  <DialogTitle>Selected</DialogTitle>
                  <DialogDescription>
                    Exercises will be added to split.
                  </DialogDescription>
                </>
              ) : (
                <>
                  <DialogTitle>None Selected</DialogTitle>
                  <DialogDescription>
                    Please search and select exercise to add to split.
                  </DialogDescription>
                </>
              )}
            </DialogHeader>
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
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ExerciseSearchDialog
