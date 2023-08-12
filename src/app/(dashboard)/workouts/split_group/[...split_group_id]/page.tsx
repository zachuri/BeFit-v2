import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase-client"

import { getServerSession } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { SplitGroupDeleteDialog } from "@/components/split/split group/split-group-delete-dialog"
import SplitGroupUpdateDialog from "@/components/split/split group/split-group-update-dialog"
import SplitAddDialog from "@/components/split/split-add-dialog"
import SplitCardsSuspense from "@/components/split/split-cards-suspense"
import { getSplitGroupName, getUserSplitsById } from "@/app/actions"

import {
  LoadingSplitGroupCard,
  LoadingSplitGroupPageCard,
  Title,
} from "./loading"

export async function generateStaticParams() {
  const supabase = createSupabaseBrowserClient()

  try {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      throw error
    }

    const { data: splits } = await supabase
      .from("split_group")
      .select("id")
      .eq("user_id", data.session?.user.id)

    return splits ?? []
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function SplitGroup({
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
      <Link href="/workouts" className="mb-10">
        <Button variant={"secondary"}>
          <Icons.chevronLeft size={20} />
          Back
        </Button>
      </Link>
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
      <Suspense fallback={<LoadingSplitGroupPageCard />}>
        {/* @ts-ignore */}
        <SplitCardsSuspense
          user_id={session.user.id}
          group_id={split_group_id}
        />
      </Suspense>
    </div>
  )
}
