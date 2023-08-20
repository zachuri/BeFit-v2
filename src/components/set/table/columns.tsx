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
]
