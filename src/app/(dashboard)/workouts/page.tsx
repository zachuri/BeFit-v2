import React from "react"
import { createSupabaseServerClient } from "@/utils/supabase-server"

import { getServerSession } from "@/lib/session"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

import InputForm from "./input"

export default async function Page() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <InputForm />

      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Workouts</h2>
        <button>
          <Icons.add />
        </button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between space-y-2">
              <h1>Split 1</h1>
              <div className="space-x-3">
                <button>
                  <Icons.add />
                </button>
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
          <div className="grid gap-2 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Push</CardTitle>
                <CardDescription>Triceps, Chest</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pull</CardTitle>
                <CardDescription>Back, Bicep</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Legs</CardTitle>
                <CardDescription>Quads, Hamstring, Calves</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </Card>
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
    </div>
  )
}
