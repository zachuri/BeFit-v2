import { Database } from "@/types/supabase.db"
import { getServerSession } from "@/lib/session"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SplitAddDialog from "@/components/split/split-add-dialog"
import SplitCards from "@/components/split/split-cards"

import { getUserSplitsById } from "../../dashboard/actions"

export type Split = Database["public"]["Tables"]["split"]["Row"]

export default async function Split({
  params,
}: {
  params: { split_id: string }
}) {
  // split_id[0] -> name
  // split_id[1] -> id
  const session = await getServerSession()

  const splits = await getUserSplitsById(session.user.id, params.split_id[1])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {params.split_id[0]}
        </h2>
        <SplitAddDialog
          user_id={session.user.id}
          split_group_id={params.split_id[1]}
        />
      </div>
      <SplitCards splits={splits} />
    </div>
  )
}
