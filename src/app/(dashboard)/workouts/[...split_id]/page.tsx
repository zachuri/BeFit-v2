import { getServerSession } from "@/lib/session"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SplitAddDialog from "@/components/split/split-add-dialog"
import SplitDisplay from "@/components/split/split-display"

import { getUserSplitsById } from "../../dashboard/actions"

export default async function Split({
  params,
}: {
  params: { split_id: string }
}) {
  // split_id[0] -> name
  // split_id[1] -> id
  const session = await getServerSession()

  const splits = await getUserSplitsById(session.user.id, params.split_id[1])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {params.split_id[0]}
        </h2>
        <SplitAddDialog
          user_id={session.user.id}
          split_group_id={params.split_id[1]}
        />

      </div>
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
    </div>
  )
}
