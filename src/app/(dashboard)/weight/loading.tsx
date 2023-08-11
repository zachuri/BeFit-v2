import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingWeightTabs() {
  return (
    <>
      <Skeleton className="h-10 w-1/6" />
      <Card className="h-full">
        <CardHeader className="gap-2"></CardHeader>
        <CardContent>
          <Skeleton className="h-[500px]" />
        </CardContent>
      </Card>
    </>
  )
}

export function LoadingWeightInput() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-7 w-1/4" />
        <Skeleton className="h-3 w-2/5" />
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-10 w-1/3" />
      </CardFooter>
    </Card>
  )
}

export function LoadingWeightGraph() {
  return (
    <section className="h-[400px]">
      <Skeleton className="h-full" />
    </section>
  )
}

export default function WeightLoading() {
  return (
    <div className="container flex-1 space-y-4 pt-6">
      <LoadingWeightGraph />
      <div className="h-95 space-y-5">
        <LoadingWeightTabs />
      </div>
    </div>
  )
}
