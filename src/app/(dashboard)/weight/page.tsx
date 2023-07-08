import React from "react"

import { getServerSession } from "@/lib/session"
import { Icons } from "@/components/icons"
import WeightLineGraph from "@/components/weight/graph/line"
import WeightLineGraph2 from "@/components/weight/graph/line2"
import { WeightInputCard } from "@/components/weight/input/weight-input-card"
import { columns } from "@/components/weight/table/columns"
import { DataTable } from "@/components/weight/table/data-table"

import { getUserWeight } from "../dashboard/actions"

export default async function Page() {
  const session = await getServerSession()

  const weights = await getUserWeight(session.user.id)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {/* <div className="flex flex-row items-center justify-between space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Weight</h2>
        <Icons.scale />
      </div> */}
      <WeightLineGraph2
        weights={weights}
        height={400}
        enableToolTip={true}
        margin={{ left: -50, right: 15, top: 25 }}
      />
      <WeightInputCard user_id={session.user.id} weight={weights[0]} />
      <DataTable columns={columns} data={weights} />
      {/* <WeightLineGraph weights={weights} /> */}
    </div>
  )
}
