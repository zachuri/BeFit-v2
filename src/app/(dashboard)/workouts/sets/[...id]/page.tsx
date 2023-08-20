import React from "react"
import Link from "next/link"

import { getServerSession } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import SetAddDialog from "@/components/set/set-add-dialog"
import { columns } from "@/components/set/table/columns"
import { DataTable } from "@/components/set/table/data-table"
import { getSetsForExercise } from "@/app/actions"

export default async function Page({ params }: { params: { id: string } }) {
  const split_id = params.id[0]
  const exercise_id = params.id[1].toString()
  const exercise_name = params.id[1].toString().replace(/_/g, " ")
  const session = await getServerSession()

  const sets = await getSetsForExercise(session.user.id, exercise_id)

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
        <SetAddDialog exercise_id={exercise_id} />

        {/* data will have workout_sets */}
        <DataTable columns={columns} data={sets} />
      </div>
    </div>
  )
}
