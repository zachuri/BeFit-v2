import React from "react"

import { getUserWeight } from "@/app/(dashboard)/dashboard/actions"

import WeightCard from "./weight-card"

export default async function WeightCardSuspense({user_id} : {user_id: string}) {
  // Array of weigths to display graph
  const weights = await getUserWeight(user_id)

  return <WeightCard mostRecentWeight={weights} />
}
