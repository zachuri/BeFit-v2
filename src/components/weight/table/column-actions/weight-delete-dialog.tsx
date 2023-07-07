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

interface WeightDeleteDialogProps {
  id: string
  weight_url: string
}

export function WeightDeleteDialog({
  id,
  weight_url,
}: WeightDeleteDialogProps) {
  const { supabaseClient } = useSessionContext()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  // Stops the dialog from clsoing
  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault() // Prevents the default behavior of the button click
    setOpen(true) // Opens the delete dialog
  }

  async function handleDelete() {
    // delete image first
    if (weight_url.length !== 0) {
      const { userId, fileName } = getBucketPath(weight_url, "progress")

      const { data: deleteImage, error: errorDeleteImage } =
        await supabaseClient.storage
          .from("progress")
          .remove([`${userId}/${fileName}`])

      if (errorDeleteImage) {
        return toast({
          title: "Something went wrong.",
          description: "No able to delete image",
          variant: "destructive",
        })
      }
    }

    const { data: response, error } = await supabaseClient
      .from("weight")
      .delete()
      .eq("id", id)

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: "No update was made.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your changes have been updated.",
    })

    setOpen(false)

    router.refresh()
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
            current weight.
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
