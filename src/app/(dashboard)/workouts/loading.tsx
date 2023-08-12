import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"

function Title() {
  return (
    <>
      <Button variant={"secondary"}>
        <Icons.chevronLeft size={20} />
        Back
      </Button>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Workouts</h2>
        <Button>
          <Icons.add />
        </Button>
      </div>
    </>
  )
}

export function LoadingSplitGroupCard() {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Skeleton className="h-10 w-1/5" />
      </CardHeader>
      <CardContent>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <LoadingSplitCard />
          <LoadingSplitCard />
          <LoadingSplitCard />
        </div>
      </CardContent>
    </Card>
  )
}

export function LoadingSplitCard() {
  return (
    <Card className="h-32">
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-2/5" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-5 w-3/5" />
      </CardContent>
    </Card>
  )
}

export default function LoadingWorkouts() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Title />
      <LoadingSplitGroupCard />
      <LoadingSplitGroupCard />
      <LoadingSplitGroupCard />
    </div>
  )
}
