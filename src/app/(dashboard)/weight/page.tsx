import React, { Suspense } from "react"

import { getServerSession } from "@/lib/session"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardSkeleton } from "@/components/card-skeleton"
import { Icons } from "@/components/icons"
import WeightLineGraph from "@/components/weight/graph/line"
import WeightLineGraph2 from "@/components/weight/graph/line2"
import { WeightInputCard } from "@/components/weight/input/weight-input-card"
import PhotoContent from "@/components/weight/photos/photo-content"
import { columns } from "@/components/weight/table/columns"
import { DataTable } from "@/components/weight/table/data-table"

import { getUserWeight } from "../dashboard/actions"
import WeightLoading from "./loading"

export default async function Page() {
  const session = await getServerSession()

  const weights = await getUserWeight(session.user.id)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {/* <div className="flex flex-row items-center justify-between space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Weight</h2>
        <Icons.scale />
      </div> */}
      <Suspense fallback={<WeightLoading />}>
        <WeightLineGraph2
          weights={weights}
          height={400}
          enableToolTip={true}
          margin={{ left: -50, right: 15, top: 25 }}
        />
        <WeightInputCard user_id={session.user.id} weight={weights[0]} />
        <Tabs defaultValue="table">
          <TabsList>
            <TabsTrigger value="table">Data Table</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>
          <TabsContent value="table">
            <DataTable columns={columns} data={weights} />
          </TabsContent>
          <TabsContent value="photos">
            <PhotoContent weights={weights} />
          </TabsContent>
        </Tabs>
        {/* <WeightLineGraph weights={weights} /> */}
      </Suspense>
    </div>
  )
}
