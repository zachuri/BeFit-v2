import React from "react"

import { getUserWeights } from "@/app/actions"

import WeightCard from "./weight-card"

export default async function WeightCardSuspense({
  user_id,
}: {
  user_id: string
}) {
  // Array of weigths to display graph
  const weights = await getUserWeights(user_id)

  // @ts-ignore
  return <WeightCard mostRecentWeight={weights} />
}
