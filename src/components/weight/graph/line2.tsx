"use client"

import React from "react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts"
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"

import { Weight } from "@/types/weight"
import { formatCreatedAt } from "@/lib/format-date"

interface Props {
  weights: Weight[]
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>): JSX.Element | null => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`(${label}) - ${payload[0].value} lbs`}</p>
      </div>
    )
  }

  return null
}

const WeightLineGraph2: React.FC<Props> = ({ weights }) => {
  const formattedData = weights
    .map((data) => ({
      created_at: formatCreatedAt(data.created_at).date,
      weight: data.weight,
    }))
    .reverse()

  const lastData = formattedData[formattedData.length - 1] // Get the last data point

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart margin={{ left: -50, right: 15 }} data={formattedData}>
        <CartesianGrid stroke="none" />
        <XAxis
          dataKey="created_at"
          axisLine={false}
          tick={false} // Remove X-axis labels
          interval={Math.ceil(formattedData.length / 5)} // Show only 5 x-axis labels
          tickFormatter={(value, index) =>
            index === 0 || index === formattedData.length - 1 ? value : ""
          } // Show label for first and last x-axis values
          domain={["dataMin", "dataMax"]} // Adjust the x-axis domain to include the minimum and maximum values
          padding={{ left: 0 }} // Set padding of -60 on the left side and add padding to the right side
        />
        <YAxis
          domain={["dataLow", "dataMax"]}
          axisLine={false}
          tick={false} // Remove X-axis labels
          tickCount={2} // Show only 2 y-axis labels (top and bottom)
          tickFormatter={(value, index) =>
            index === 0 || index === 1 ? value : ""
          } // Show label for top y-axis value
        />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Line
          type="linear"
          dataKey="weight"
          stroke="#8884d8"
          dot={false}
          legendType="none"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default WeightLineGraph2
