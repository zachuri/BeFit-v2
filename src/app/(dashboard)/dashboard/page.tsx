import React, { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { getServerSession } from "@/lib/session"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CardSkeleton } from "@/components/card-skeleton"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"

import { getUserWeight } from "./actions"
import WeightCard from "./weight-card"

export default async function Page() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  // Array of weigths to display graph
  const weights = await getUserWeight(session?.user.id)

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* Title */}
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

        {/* Navigation */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<CardSkeleton />}>
            <WeightCard mostRecentWeight={weights} />
          </Suspense>
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
            <Link href={"/workouts"}>
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
        <div className="flex flex-col space-y-5 max-sm:hidden sm:block">
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
