"use client"

import { Split } from "@/types/split"
import { Database } from "@/types/supabase.db"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Props {
  splits: Split[]
}

export default function SplitCards({ splits }: Props) {
  return (
    <div className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
      {splits.length > 0 ? (
        // If there are splits for the group, display them
        splits.map((split) => (
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
  )
}
