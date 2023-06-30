"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Weight } from "@/types/weight"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Weight>[] = [
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
]
