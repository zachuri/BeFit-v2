import React from "react"

import { Database } from "@/types/supabase.db"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

import SplitAddDialog from "./split-add-dialog"

export type SplitGroup = Database["public"]["Tables"]["split_group"]["Row"]

interface Props {
  splits: SplitGroup[]
  user_id: string
}

export default function SplitDisplay({ splits, user_id }: Props) {
  return (
    <>
      {splits.map((split) => {
        return (
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between space-y-2">
                  <h1>{split.name}</h1>
                  <div className="space-x-3">
                    <button>
                      <Icons.edit />
                    </button>
                    <button>
                      <Icons.trash />
                    </button>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="items-right flex">
                <SplitAddDialog user_id={user_id} split_group_id={split.id} />
              </div>
              {split.splits === null ? (
                <CardHeader>
                  <CardTitle>No split&apos;s added</CardTitle>
                  <CardDescription>
                    Please add all your individaul split&apos;s
                  </CardDescription>
                </CardHeader>
              ) : (
                <div className="grid gap-2 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Push</CardTitle>
                      <CardDescription>Triceps, Chest</CardDescription>
                    </CardHeader>
                    <CardContent></CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}
