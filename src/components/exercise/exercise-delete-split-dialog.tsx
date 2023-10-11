"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSessionContext } from "@supabase/auth-helpers-react"

import { getBucketPath } from "@/lib/bucket-path"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

import { Icons } from "../icons"

interface Props {
  split_id: string
  exercise_id: string
}

export function ExerciseDeleteSplitDialog({ split_id, exercise_id }: Props) {
  const { supabaseClient } = useSessionContext()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  // // Stops the dialog from clsoing
  // const handleClick = (event: { preventDefault: () => void }) => {
  //   event.preventDefault() // Prevents the default behavior of the button click
  //   setOpen(true) // Opens the delete dialog
  // }

  async function handleDelete() {
    try {
      // Fetch the exercise data first
      const { data, error: fetchError } = await supabaseClient
        .from("exercise")
        .select("split_ids")
        .eq("exercise_id", exercise_id)

      if (fetchError) {
        console.log(fetchError.message)
        return
      }

      const exerciseData = data[0]

      // Modify the split_ids array in JavaScript
      const updatedSplitIds = exerciseData.split_ids.filter(
        (id: string) => id !== split_id
      )

      // Update the row with the modified split_ids
      const { error: updateError } = await supabaseClient
        .from("exercise")
        .update({ split_ids: updatedSplitIds })
        .eq("exercise_id", exercise_id)

      if (updateError) {
        console.log(updateError.message)
      } else {
        toast({
          description: "Your changes have been updated.",
        })

        setOpen(false)

        router.refresh()
      }
    } catch (error) {
      return toast({
        title: "Something went wrong.",
        description: "No update was made.",
        variant: "destructive",
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Icons.trash />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            exercise from this split.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
