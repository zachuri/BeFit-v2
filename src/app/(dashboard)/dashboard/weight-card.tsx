"use client"

import Link from "next/link"

import { Weight } from "@/types/weight"
import { formatCreatedAt } from "@/lib/format-date"
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import WeightLineGraph2 from "@/components/weight/graph/line2"

export default function WeightCard({
  mostRecentWeight,
}: {
  mostRecentWeight: Weight[]
}) {
  const weights = mostRecentWeight

  const { date: today } = formatCreatedAt(new Date())
  const mostRecentDate = weights
    ? formatCreatedAt(weights[0].created_at).date
    : null

  return (
    <Link href={"/weight"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Weight</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative flex flex-row">
          <div className="mr-1 w-full">
            <div className="text-2xl font-bold">
              {today !== mostRecentDate ? (
                <p className="text-red-500 dark:text-red-300">Add weight</p>
              ) : (
                <>{weights[0].weight} lbs</>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              -20.1% from last month
            </p>
          </div>
          <WeightLineGraph2
            weights={weights}
            height={100}
            enableToolTip={false}
            margin={{ left: -50, right: 15 }}
          />
        </div>
      </CardContent>
    </Link>
  )
}
