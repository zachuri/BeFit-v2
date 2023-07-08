"use client"

import Link from "next/link"

import { Weight } from "@/types/weight"
import { formatCreatedAt } from "@/lib/format-date"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function WeightCard({
  mostRecentWeight,
}: {
  mostRecentWeight: Weight
}) {
  const weights = mostRecentWeight

  const { date: today } = formatCreatedAt(new Date())
  const mostRecentDate = weights
    ? formatCreatedAt(weights.created_at).date
    : null

  return (
    <Link href={"/weight"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Weight</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {today !== mostRecentDate ? (
            <p className="text-red-500 dark:text-red-300">Add weight</p>
          ) : (
            <>{weights.weight} lbs</>
          )}
        </div>
        <p className="text-xs text-muted-foreground">-20.1% from last month</p>
      </CardContent>
    </Link>
  )
}
