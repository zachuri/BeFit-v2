import React, { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { getServerSession } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import SplitGroupDisplay from "@/components/split/split group/split-group-display"

import SplitGroupDialog from "../../../components/split/split group/split-group-dialog"
import { getUserGroupSplits, getUserSplits } from "../../actions"
import { LoadingSplitGroupCard } from "./loading"

export default async function Page() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  const split_group = await getUserGroupSplits(session.user.id)
  const splits = await getUserSplits(session.user.id)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Link href="/dashboard">
        <Button variant={"secondary"}>
          <Icons.chevronLeft size={20} />
          Back
        </Button>
      </Link>
      <SplitGroupDialog user_id={session.user.id} />
      <Suspense fallback={<LoadingSplitGroupCard />}>
        <SplitGroupDisplay split_group={split_group} splits={splits} />
      </Suspense>
    </div>
  )
}
