import React from "react"

import { getUserWeights } from "@/app/actions"

import WeigthTabsDisplay from "../table/weight-tabs-display"

interface Props {
  user_id: string
}

export default async function WeightTabsSuspense({ user_id }: Props) {
  const weights = await getUserWeights(user_id)

  return <WeigthTabsDisplay weights={weights} />
}
