"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { createSupabaseBrowserClient } from "@/utils/supabase-client"

import { Database } from "@/types/supabase.db"
import { Input } from "@/components/ui/input"

export type Exercises = Database["public"]["Tables"]["exercises"]["Row"]

const ExerciseSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [exerciseList, setExerciseList] = useState<Exercises[]>([])

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

  return (
    <div>
      <Input
        type="text"
        placeholder="Search for exercises"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ul>
        {exerciseList
          .filter((data) => {
            return data.name.toLowerCase().includes(searchQuery.toLowerCase())
          })
          .map((exercise) => (
            <>
              <li key={exercise.id}>{exercise.name}</li>
              {exercise.images?.map((image) => {
                return (
                  <Image
                    src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${image}`}
                    width={100}
                    height={100}
                    alt={""}
                  />
                )
              })}
            </>
          ))}
      </ul>
    </div>
  )
}

export default ExerciseSearch
