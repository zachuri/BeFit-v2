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
export type Split = Database["public"]["Tables"]["split"]["Row"]

interface Props {
  split_group: SplitGroup[]
  splits: Split[]
  user_id: string
}

export default function SplitDisplay({ split_group, splits, user_id }: Props) {
  return (
    <>
      {split_group.map((group) => {
        // Filter the splits associated with the current group
        const groupSplits = splits.filter(
          (split) => split.split_group_id === group.id
        )

        return (
          <Card key={group.id}>
            {" "}
            {/* Assuming you have a unique 'id' for each group */}
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between space-y-2">
                  <h1>{group.name}</h1>
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
                <SplitAddDialog user_id={user_id} split_group_id={group.id} />
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                {groupSplits.length > 0 ? (
                  // If there are splits for the group, display them
                  groupSplits.map((split) => (
                    <Card key={split.id}>
                      {" "}
                      {/* Assuming you have a unique 'id' for each split */}
                      <CardHeader>
                        <CardTitle>{split.name}</CardTitle>
                        <CardDescription>
                        {split.muscle_targets?.length ? (
                          <p>{split.muscle_targets.join(", ")}</p>
                        ) : (
                          <p>No muscle targets added</p>
                        )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* Any content you want to display for each split */}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  // If there are no splits for the group, display the message
                  <CardHeader>
                    <CardTitle>No split&apos;s added</CardTitle>
                    <CardDescription>
                      Please add all your individual splits
                    </CardDescription>
                  </CardHeader>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}
