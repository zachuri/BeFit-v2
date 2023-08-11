import React from "react"

import WeightCard from "./weight-card"
import { getUserWeights } from '@/app/actions'

export default async function WeightCardSuspense({
  user_id,
}: {
  user_id: string
}) {
  // Array of weigths to display graph
  const weights = await getUserWeights(user_id)

  return <WeightCard mostRecentWeight={weights} />
}
