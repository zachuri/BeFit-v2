"use client"

import React, { useEffect, useState } from "react"
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
            <li key={exercise.id}>{exercise.name}</li>
          ))}
      </ul>
    </div>
  )
}

export default ExerciseSearch
