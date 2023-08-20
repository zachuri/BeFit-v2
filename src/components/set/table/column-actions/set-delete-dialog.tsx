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

interface Props {
  id: string
}

export function SetDeleteDialog({ id }: Props) {
  const { supabaseClient } = useSessionContext()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  // Stops the dialog from clsoing
  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault() // Prevents the default behavior of the button click
    setOpen(true) // Opens the delete dialog
  }

  async function handleDelete() {
    try {
      const { data, error } = await supabaseClient
        .from("workout_sets")
        .delete()
        .eq("id", id)

      if (error) {
        throw error
      }

      toast({
        description: "Your changes have been updated.",
      })

      setOpen(false)

      router.refresh()
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
        <button className="text-red-500" onClick={handleClick}>
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            current set.
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
