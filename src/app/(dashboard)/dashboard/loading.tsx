import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-4 w-4/5" />
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-5 w-[120px]" />
      </CardFooter>
    </Card>
  )
}

export default function DashboardLoading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="grid gap-4 max-sm:hidden sm:block md:grid-cols-2 lg:grid-cols-7">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  )
}
