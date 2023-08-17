"use client"

import React, { useState } from "react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/icons"

import SetAddForm from "./set-add-form"

interface Props {
  // user_id: string
  exercise_id: string
}

export default function SplitAddDialog({ exercise_id }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Icons.add className="mr-2" />
              Add Set
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a set to current exercise</DialogTitle>
              <DialogDescription>
                Click submit when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center gap-4">
                <SetAddForm exercise_id={exercise_id} setOpen={setOpen} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
