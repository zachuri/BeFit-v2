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

import { SplitGroupUpdateForm } from "./split-group-update-form"

interface Props {
  split_group_id: string
  user_id: string
  name: string
}

export default function SplitGroupUpdateDialog({
  split_group_id,
  user_id,
  name,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className={cn(buttonVariants())}
            onClick={() => setOpen(true)}
          >
            <Icons.edit />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Split Group Name</DialogTitle>
            <DialogDescription>
              Click submit when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <SplitGroupUpdateForm
                split_group_id={split_group_id}
                user_id={user_id}
                name={name}
                setOpen={setOpen}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
