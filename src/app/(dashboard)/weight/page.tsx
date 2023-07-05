import React from "react"
import { createSupabaseServerClient } from "@/utils/supabase-server"

import { Weight } from "@/types/weight"
import { getServerSession } from "@/lib/session"
import { WeightForm } from "@/components/weight/input/weight-form"
import { columns } from "@/components/weight/table/columns"
import { DataTable } from "@/components/weight/table/data-table"
import { getUserWeight } from '../dashboard/actions'

export default async function Page() {
  const session = await getServerSession()

  const weights = await getUserWeight(session.user.id)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Weight</h2>
      <WeightForm user_id={session.user.id} weight={weights[0]} />
      <DataTable columns={columns} data={weights} />
    </div>
  )
}
