import React from "react"

import { getServerSession } from "@/lib/session"
import SplitDisplay from "@/components/split/split-display"

import SplitGroupDialog from "../../../components/split/split-group-dialog"
import { getUserGroupSplits, getUserSplit } from "../dashboard/actions"

export default async function Page() {
  const session = await getServerSession()

  const split_group = await getUserGroupSplits(session.user.id)
  const splits = await getUserSplit(session.user.id)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <SplitGroupDialog user_id={session.user.id} />
      <SplitDisplay split_group={split_group} splits={splits} user_id={session.user.id} />
    </div>
  )
}
