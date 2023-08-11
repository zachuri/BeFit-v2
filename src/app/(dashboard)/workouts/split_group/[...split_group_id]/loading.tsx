import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CardSkeleton } from "@/components/card-skeleton"
import { Icons } from "@/components/icons"

export function Title() {
  return (
    <>
      <Button variant={"secondary"}>
        <Icons.chevronLeft size={20} />
        Back
      </Button>
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-10 w-1/5" />
        <div className="flex flex-row gap-5">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </>
  )
}
export function LoadingSplitGroupPageCard() {
  return (
    <>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <LoadingSplitCard />
        <LoadingSplitCard />
        <LoadingSplitCard />
        <LoadingSplitCard />
        <LoadingSplitCard />
      </div>
    </>
  )
}

export function LoadingSplitGroupCard() {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Skeleton className="h-15 w-1/5" />
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

export default function SplitGroupLoading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Title />
      <LoadingSplitGroupPageCard />
    </div>
  )
}
