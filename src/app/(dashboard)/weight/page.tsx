import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import { getServerSession } from "@/lib/session"
import WeightGraphSuspense from "@/components/weight/suspense/weight-graph-suspense"
import WeightInputSuspense from "@/components/weight/suspense/weight-input-suspense"
import WeightTabsSuspense from "@/components/weight/suspense/weight-tabs-suspense"

import {
  LoadingWeightGraph,
  LoadingWeightInput,
  LoadingWeightTabs,
} from "./loading"

export default async function Page() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Suspense fallback={<LoadingWeightGraph />}>
        <WeightGraphSuspense user_id={session.user.id} />
      </Suspense>

      <Suspense fallback={<LoadingWeightInput />}>
        <WeightInputSuspense user_id={session.user.id} />
      </Suspense>

      {/* Displays tabs with table and photos */}
      <Suspense fallback={<LoadingWeightTabs />}>
        <WeightTabsSuspense user_id={session.user.id} />
      </Suspense>
    </div>
  )
}
