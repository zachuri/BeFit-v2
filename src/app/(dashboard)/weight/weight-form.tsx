"use client"

import React from "react"

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
}

export const WeightForm = ({ user_id }: Props) => {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Today&apos;s Weight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">180 lbs</div>
          <p className="text-xs text-muted-foreground">
            -20.1% from last month
          </p>
        </CardContent>
        <CardFooter>
          <WeightDialog user_id={user_id} />
        </CardFooter>
      </Card>
    </>
  )
}
