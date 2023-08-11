import React from "react"

import { getUserSplitsById } from "@/app/(dashboard)/dashboard/actions"

import SplitCards from "./split-cards"

interface Props {
  user_id: string
  group_id: string
}

export default async function SplitCardsDisplay({ user_id, group_id }: Props) {
  const splits = await getUserSplitsById(user_id, group_id)
  return (
    <div>
      <SplitCards splits={splits} />
    </div>
  )
}
