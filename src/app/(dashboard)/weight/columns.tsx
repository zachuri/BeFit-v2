"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Weight } from "@/types/weight"
import { Button, buttonVariants } from "@/components/ui/button"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DeleteDialog, UpdateDialog } from "./column-dialog"

export const columns: ColumnDef<Weight>[] = [
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
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const time_stamp = row.getValue("created_at")

      let timestampDate
      if (typeof time_stamp === "string" || typeof time_stamp === "number") {
        timestampDate = new Date(time_stamp)
      } else if (time_stamp instanceof Date) {
        timestampDate = time_stamp
      } else {
        console.error("Invalid timestamp value")
        return
      }

      const options = {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }

      const formattedTime = new Date(time_stamp).toLocaleString(
        undefined,
        options
      )

      return <>{formattedTime}</>
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const weight = row.original

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
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  weight.weight !== null ? weight.weight.toString() : ""
                )
              }
            >
              Copy
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => {
                // fixes problem with dialog disabling all the buttons
                document.body.style.pointerEvents = ""
              }}
            >
              <UpdateDialog weight={weight} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteDialog id={weight.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
