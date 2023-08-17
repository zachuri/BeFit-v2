import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import SetAddDialog from "@/components/set/set-add-dialog"
import { columns } from "@/components/set/table/columns"
import { DataTable } from "@/components/set/table/data-table"

export default async function Page({ params }: { params: { id: string } }) {
  const split_id = params.id[0]
  const exercise_name = params.id[1].toString().replace(/_/g, " ")

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col justify-between gap-5">
        <Link href={`/workouts/split/${split_id}`} className="mb-5">
          <Button variant={"secondary"}>
            <Icons.chevronLeft size={20} />
            Back
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">{exercise_name}</h2>
        <SetAddDialog exercise_id={""} />

        {/* data will have workout_sets */}
        <DataTable columns={columns} data={[]} />
      </div>
    </div>
  )
}
