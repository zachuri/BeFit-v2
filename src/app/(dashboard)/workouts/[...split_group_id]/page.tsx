import { notFound } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase-client"

import { getServerSession } from "@/lib/session"
import { SplitGroupDeleteDialog } from "@/components/split/split group/split-group-delete-dialog"
import SplitGroupUpdateDialog from "@/components/split/split group/split-group-update-dialog"
import SplitAddDialog from "@/components/split/split-add-dialog"
import SplitCards from "@/components/split/split-cards"

import { getSplitGroupName, getUserSplitsById } from "../../dashboard/actions"

export async function generateStaticParams() {
  const supabase = createSupabaseBrowserClient()

  const { data: splits } = await supabase.from("split_group").select("id")

  return splits ?? []
}

export default async function Split({
  params,
}: {
  params: { split_group_id: string }
}) {
  const split_group_id = params.split_group_id[0]

  const session = await getServerSession()
  const splits = await getUserSplitsById(session.user.id, split_group_id)
  const name = await getSplitGroupName(split_group_id)

  if (!splits) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{name}</h2>
        <div className="flex flex-row gap-3">
          <SplitGroupDeleteDialog
            name={name}
            split_group_id={split_group_id}
            user_id={session.user.id}
          />
          <SplitGroupUpdateDialog
            split_group_id={split_group_id}
            user_id={session.user.id}
            name={name}
          />
          <SplitAddDialog
            user_id={session.user.id}
            split_group_id={split_group_id}
          />
        </div>
      </div>
      <SplitCards splits={splits} />
    </div>
  )
}

export const dynamic = "force-dynamic"
