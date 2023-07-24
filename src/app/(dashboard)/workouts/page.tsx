import React from "react"

import { getServerSession } from "@/lib/session"
import SplitDisplay from "@/components/split/split-display"

import SplitAddDialog from "../../../components/split/split-add-dialog"
import { getUserSplit } from "../dashboard/actions"

export default async function Page() {
  const session = await getServerSession()

  const split = await getUserSplit(session.user.id)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <SplitAddDialog user_id={session.user.id} />
      <SplitDisplay splits={split} />
    </div>
  )
}
