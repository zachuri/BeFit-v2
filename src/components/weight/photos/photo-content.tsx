"use client"

import React from "react"
import { useSessionContext } from "@supabase/auth-helpers-react"

import { Weight } from "@/types/weight"
import { getBucketPath } from "@/lib/bucket-path"

import WeigthPhoto from "./photo"

interface Props {
  weights: Weight[]
}

export default function PhotoContent({ weights }: Props) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {weights.map(
        // Only show the weights with photos
        (weight) => weight.weight_url && <WeigthPhoto weight={weight} />
      )}
    </div>
  )
}
