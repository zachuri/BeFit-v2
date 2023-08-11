import React from "react"

import { getUserWeight } from "@/app/actions"

import { WeightInputCard } from "../input/weight-input-card"

interface Props {
  user_id: string
}

export default async function WeightInputSuspense({ user_id }: Props) {
  const weight = await getUserWeight(user_id)

  return <WeightInputCard user_id={user_id} weight={weight} />
}
