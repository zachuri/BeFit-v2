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

import SplitAddForm from "./split-add-form"

interface Props {
  user_id: string
  split_group_id: string
}

export default function SplitAddDialog({ user_id, split_group_id }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
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
              <DialogTitle>Add a split to a group</DialogTitle>
              <DialogDescription>
                Click submit when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center gap-4">
                <SplitAddForm
                  user_id={user_id}
                  split_group_id={split_group_id}
                  setOpen={setOpen}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
