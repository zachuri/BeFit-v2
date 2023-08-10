"use client"

import React from "react"
import Link from "next/link"

import { Split, SplitGroup } from "@/types/split"
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
  const content =
    split_group.length > 0 ? (
      split_group.map((group) => {
        const groupSplits = splits.filter(
          (split) => split.split_group_id === group.id
        )

        return (
          <Card key={group.id}>
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
      })
    ) : (
      <CardHeader>
        <CardTitle>No Split Added</CardTitle>
        <CardDescription>
          Please create a split that you would like to organize.
        </CardDescription>
      </CardHeader>
    )

  return <>{content}</>
}
