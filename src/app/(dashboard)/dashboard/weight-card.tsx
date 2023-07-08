"use client"

import Link from "next/link"

import { Weight } from "@/types/weight"
import { formatCreatedAt } from "@/lib/format-date"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
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
    <Card>
      <Link href={"/weight"}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weight</CardTitle>
          <Icons.scale className={"h-4 w-4"} />
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
                -20.1% up from last month
              </p>
            </div>
            <WeightLineGraph2
              weights={weights}
              height={75}
              enableToolTip={false}
              margin={{ left: -50 }}
            />
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
