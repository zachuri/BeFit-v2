"use client"

import { useState } from "react"
import Link from "next/link"

import { Split } from "@/types/split"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Icons } from "../icons"
import { SplitDeleteDialog } from "./split-delete-dialog"
import { SplitUpdateForm } from "./split-update-form"

interface Props {
  splits: Split[]
}

export default function SplitCards({ splits }: Props) {
  const [open, setOpen] = useState(false) // Stops the dialog from clsoing

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault() // Prevents the default behavior of the button click
    setOpen(true) // Opens the delete dialog
  }

  return (
    <div className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
      {splits.length > 0 ? (
        // If there are splits for the group, display them
        splits.map((split) => (
          <Link href={`workouts/split/${split.id}`}>
            <Card key={split.id}>
              {/* Assuming you have a unique 'id' for each split */}
              <CardHeader>
                <CardTitle className="flex justify-between">
                  {split.name}
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Icons.ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DropdownMenuItem
                          onSelect={(event) => {
                            event.preventDefault()
                          }}
                        >
                          <DialogTrigger asChild>
                            <button onClick={handleClick}>Update</button>
                          </DialogTrigger>
                        </DropdownMenuItem>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Add weight</DialogTitle>
                            <DialogDescription>
                              Click save when you&apos;re done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid items-center gap-4">
                              <SplitUpdateForm
                                split={split}
                                setOpen={setOpen}
                              />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <DropdownMenuItem>
                        <SplitDeleteDialog split_id={split.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardTitle>
                <CardDescription>
                  {split.muscle_targets?.length
                    ? split.muscle_targets.join(", ")
                    : "No muscle targtets added"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Any content you want to display for each split */}
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        // If there are no splits for the group, display the message
        <CardHeader>
          <CardTitle>No split&apos;s added</CardTitle>
          <CardDescription>
            Please add all your individual splits
          </CardDescription>
        </CardHeader>
      )}
    </div>
  )
}
