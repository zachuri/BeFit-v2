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

  const mostRecentDate =
    weights && weights.length > 0
      ? formatCreatedAt(weights[0].created_at).date
      : null

  return (
    <Card>
      <Link href={"/weight"}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weight</CardTitle>
          <Icons.scale className={"h-4 w-4"} />
        </CardHeader>
        <CardContent className="h-[75px]">
          <div className="relative flex flex-row">
            <div className="w-full">
              <>
                {today !== mostRecentDate ? (
                  <>
                    <h1 className="text-2xl font-bold text-red-300">
                      - - - lbs
                    </h1>
                    <div className="overflow-hidden">
                      <p className="text-xs text-muted-foreground">
                        Add today&apos;s weight
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold">
                      {weights[0].weight} <span className="text-sm">lbs</span>
                    </h1>
                    <div className="overflow-hidden">
                      <p className="text-xs text-muted-foreground">
                        -5.1% in a month
                      </p>
                    </div>
                  </>
                )}
              </>
            </div>
            <WeightLineGraph2
              weights={weights}
              height={70}
              enableToolTip={false}
              margin={{ left: -60 }}
            />
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
