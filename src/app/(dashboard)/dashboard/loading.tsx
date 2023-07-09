import { CardSkeleton } from "@/components/card-skeleton"

export default function DashboardLoading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
