import React from "react"

import { Weight } from "@/types/weight"

import WeightLineGraph2 from "./line2"

interface Props {
  weights: Weight[]
}

export default function WeightGraphDisplay({ weights }: Props) {
  return (
    <>
      {weights.length > 0 ? (
        <WeightLineGraph2
          weights={weights}
          height={400}
          enableToolTip={true}
          margin={{ left: -50, right: 15, top: 25 }}
        />
      ) : (
        <section className="flex h-[400px] items-center justify-center opacity-50">
          Need more data to display graph
        </section>
      )}
    </>
  )
}
