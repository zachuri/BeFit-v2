import React from "react"

import { getUserSplitsById } from "@/app/(dashboard)/dashboard/actions"

import SplitCards from "./split-cards"

interface Props {
  user_id: string
  group_id: string
}

// This will load display once the data is loaded
// if not loaded will call the suspense
export default async function SplitCardsSuspense({ user_id, group_id }: Props) {
  const splits = await getUserSplitsById(user_id, group_id)
  return (
    <div>
      <SplitCards splits={splits} />
    </div>
  )
}
