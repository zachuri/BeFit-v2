"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSessionContext } from "@supabase/auth-helpers-react"

import { getBucketPath } from "@/lib/bucket-path"
import { cn } from "@/lib/utils"
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
import { Button, buttonVariants } from "../ui/button"
import { Input } from "../ui/input"

interface Props {
  name: string
  split_group_id: string
  user_id: string
}

export function SplitGroupDeleteDialog({
  name,
  split_group_id,
  user_id,
}: Props) {
  const { supabaseClient } = useSessionContext()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [splitDelete, setSplitDelete] = useState("")

  async function handleDelete() {
    if (splitDelete === name) {
      try {
        const { error } = await supabaseClient
          .from("split_group")
          .delete()
          .eq("id", split_group_id)

        if (error) {
          console.log(error?.message)
          throw error
        }

        toast({
          description: "Your changes have been updated.",
        })

        router.push("/workouts")
      } catch (error) {
        return toast({
          title: "Something went wrong.",
          description: "No update was made.",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "Error",
        description: "Names do not match. Deletion canceled.",
        variant: "destructive",
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className={cn(buttonVariants(), "text-red-500")}>
          <Icons.trash />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            current weight.
          </AlertDialogDescription>
          <AlertDialogDescription>
            Please type name of the split to confirm.
          </AlertDialogDescription>
          <AlertDialogDescription>
            <Input
              placeholder={name}
              onChange={(e) => {
                setSplitDelete(e.target.value)
              }}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete} variant="destructive">
            I understand the consequences
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
