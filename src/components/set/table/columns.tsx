"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Weight } from "@/types/weight"
import { WorkoutSets } from "@/types/workout_sets"
import { formatCreatedAt } from "@/lib/format-date"
import { Button, buttonVariants } from "@/components/ui/button"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Checkbox } from "@/components/ui/checkbox"
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
import { Icons } from "@/components/icons"
import { WeightDeleteDialog } from "@/components/weight/table/column-actions/weight-delete-dialog"
import { WeightUpdateForm } from "@/components/weight/table/column-actions/weight-update-form"

import SetUpdateForm from "./column-actions/set-update-form"

export const columns: ColumnDef<WorkoutSets>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "weight",
    header: "Weight (lbs)",
  },
  {
    accessorKey: "reps",
    header: "Reps",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <Icons.arrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const time_stamp = row.getValue("created_at")

      const { time, date } = formatCreatedAt(time_stamp)

      return (
        <>
          {date}, {time}
        </>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setOpen] = useState(false) // Stops the dialog from clsoing

      const handleClick = (event: { preventDefault: () => void }) => {
        event.preventDefault() // Prevents the default behavior of the button click
        setOpen(true) // Opens the delete dialog
      }

      const set = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            {/* Copy action */}
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  set.weight !== null ? set.weight.toString() : ""
                )
              }
            >
              Copy
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {/* Update Action: Menu Item passed in dialog */}
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
                    <SetUpdateForm set={set} setOpen={setOpen} />
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Delete action: Alert Dialog for Delete */}
            <DropdownMenuItem>
              {/* <WeightDeleteDialog
                id={weight.id}
                weight_url={weight.weight_url || ""}
              /> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
