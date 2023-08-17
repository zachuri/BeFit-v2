import React from "react"

import { Weight } from "@/types/weight"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { columns } from "@/components/weight/table/columns"

import PhotoContent from "../photos/photo-content"
import { DataTable } from "./data-table"

interface Props {
  weights: Weight[]
}

export default function WeightTabsDisplay({ weights }: Props) {
  return (
    <>
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
    </>
  )
}
