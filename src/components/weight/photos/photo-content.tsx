"use client"

import React from "react"
import { useSessionContext } from "@supabase/auth-helpers-react"

import { Weight } from "@/types/weight"
import { getBucketPath } from "@/lib/bucket-path"

import WeigthPhoto from "./photos"

interface Props {
  weights: Weight[]
}

export default function PhotoContent({ weights }: Props) {
  return (
    <>
      {weights.map(
        // Only show the weights with photos
        (weight) => weight.weight_url && <WeigthPhoto weight={weight} />
      )}
    </>
  )
}
