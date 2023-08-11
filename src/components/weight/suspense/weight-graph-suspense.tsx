import React from "react"

import { getUserWeights } from "@/app/actions"

import WeightGraphDisplay from "../graph/weight-graph-display"

interface Props {
  user_id: string
}

export default async function WeightGraphSuspense({ user_id }: Props) {
  const weights = await getUserWeights(user_id)

  return <WeightGraphDisplay weights={weights} />
}
