"use client"

import React from "react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Weight } from "@/types/weight"
import { formatCreatedAt } from "@/lib/format-date"

interface Props {
  weights: Weight[]
}

const WeightLineGraph2: React.FC<Props> = ({ weights }) => {
  const formattedData = weights
    .map((data) => ({
      created_at: formatCreatedAt(data.created_at).date,
      weight: data.weight,
    }))
    .reverse()

  const lastData = formattedData[formattedData.length - 1] // Get the last data point
  const yAxisStart =
    lastData && lastData.weight ? Math.floor(lastData.weight / 10) * 10 : 0 // Round down to nearest multiple of 10

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created_at" />
        <YAxis domain={[yAxisStart, "dataMax"]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default WeightLineGraph2
