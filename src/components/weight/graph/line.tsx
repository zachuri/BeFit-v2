"use client"

import React from "react"
import { Chart, registerables } from "chart.js"
import { Line } from "react-chartjs-2"

import { Weight } from "@/types/weight"
import { formatCreatedAt } from "@/lib/format-date"

Chart.register(...registerables)

interface Props {
  weights: Weight[]
}

const WeightLineGraph = ({ weights }: Props) => {
  // Extracting the created_at and weight values from the weights data
  const labels = weights
    .map((data) => formatCreatedAt(data.created_at).date)
    .reverse()
  const data = weights.map((data) => data.weight).reverse()

  // Configuring the chart data and options
  const chartData = {
    labels,
    datasets: [
      {
        label: "Weight",
        data,
        fill: false,
        borderColor: "blue",
      },
    ],
  }

  // Configure the chart options
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Weight",
        },
      },
    },
  }

  // Create the chart dataset
  const dataset = {
    label: "Weight",
    data: data,
    fill: false,
    borderColor: "rgba(75, 192, 192, 1)", // Color of the line
    tension: 0.4, // Curvature of the line
  }

  return (
    <>
      {weights.length > 0 ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <h1>Please input results</h1>
      )}
    </>
  )
}

export default WeightLineGraph
