"use client"

import React from "react"

import { Weight } from "@/types/weight"
import { formatCreatedAt } from "@/lib/format-date"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { WeightDialog } from "./weight-dialog"

interface Props {
  user_id: string
  weight: Weight
}

export const WeightInputCard = ({ user_id, weight }: Props) => {
  const { date: today } = formatCreatedAt(new Date())
  const { date: mostRecentDate } = formatCreatedAt(weight.created_at)

  const isToday = today === mostRecentDate

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Today&apos;s Weight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isToday ? <>{weight.weight} lbs</> : <>Add Weight</>}
          </div>
          <p className="text-xs text-muted-foreground">
            -20.1% from last month
          </p>
        </CardContent>
        <CardFooter>
          {isToday ? <></> : <WeightDialog user_id={user_id} />}
        </CardFooter>
      </Card>
    </>
  )
}
