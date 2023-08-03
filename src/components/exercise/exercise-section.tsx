import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const ExercisePage = () => {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Exercises</h2>
      <Card>
        <CardHeader>
          <CardTitle>Leg</CardTitle>
          <CardDescription>All exercise&apos;s for leg&apos;s</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Leg Extensions</CardTitle>
                <CardDescription>Quads</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Leg Curls</CardTitle>
                <CardDescription>Hamstrings</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Leg Press</CardTitle>
                <CardDescription>Quad, Glutes</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Romanian Dead Lift</CardTitle>
                <CardDescription>Hamstring, Glute</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Standing Calf raise</CardTitle>
                <CardDescription>Calves</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Leg</CardTitle>
          <CardDescription>All exercise&apos;s for leg&apos;s</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Leg Extensions</CardTitle>
                <CardDescription>Quads</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Leg Curls</CardTitle>
                <CardDescription>Hamstrings</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Leg Press</CardTitle>
                <CardDescription>Quad, Glutes</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Romanian Dead Lift</CardTitle>
                <CardDescription>Hamstring, Glute</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Standing Calf raise</CardTitle>
                <CardDescription>Calves</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
