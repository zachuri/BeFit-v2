import React from "react"
import Link from "next/link"

import { formatCreatedAt } from "@/lib/format-date"
import { getServerSession } from "@/lib/session"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"

import { getUserWeight } from "./actions"

export default async function Page() {
  const session = await getServerSession()
  const weights = await getUserWeight(session.user.id)

  const { date: today } = formatCreatedAt(new Date())
  const { date: mostRecentDate } = formatCreatedAt(weights[0].created_at)

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* Title */}
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

        {/* Navigation */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <Link href={"/weight"}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weight</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Link>
          </Card>
          <Card>
            <Link href={"/Diet"}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Diet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2300 cals</div>
                <p className="text-xs text-muted-foreground">
                  -5.1% from yesterday
                </p>
              </CardContent>
            </Link>
          </Card>
          <Card>
            <Link href={"/Workout"}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Leg Day</div>
                <p className="text-xs text-muted-foreground">Recent workout</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Overview/ Recent Activities */}
        <div className="grid gap-4 max-sm:hidden sm:block md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
