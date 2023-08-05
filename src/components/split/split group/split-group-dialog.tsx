"use client"

import React, { useState } from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/icons"
import { SplitGroupForm } from "@/components/split/split group/split-group-form"

interface Props {
  user_id: string
}

export default function SplitGroupAddDialog({ user_id }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Workouts</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              className={cn(buttonVariants())}
              onClick={() => setOpen(true)}
            >
              <Icons.add />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Split Group Name</DialogTitle>
              <DialogDescription>
                Click submit when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center gap-4">
                <SplitGroupForm user_id={user_id} setOpen={setOpen} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
