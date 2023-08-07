"use client"

import React from "react"
import Link from "next/link"

import { Split, SplitGroup } from "@/types/split"
import { Database } from "@/types/supabase.db"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SplitCards from "@/components/split/split-cards"

interface Props {
  split_group: SplitGroup[]
  splits: Split[]
}

export default function SplitDisplay({ split_group, splits }: Props) {
  return (
    <>
      {split_group.map((group) => {
        // Filter the splits associated with the current group
        const groupSplits = splits.filter(
          (split) => split.split_group_id === group.id
        )

        return (
          <Card key={group.id}>
            {/* Assuming you have a unique 'id' for each group */}
            <Link href={`workouts/split_group/${group.id}`}>
              <CardHeader>
                <CardTitle className="hover:underline ">{group.name}</CardTitle>
              </CardHeader>
            </Link>
            <CardContent>
              <SplitCards splits={groupSplits} />
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}
