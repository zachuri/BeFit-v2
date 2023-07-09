import { CardSkeleton } from "@/components/card-skeleton"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function WeightLoading() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <section className="h-[400px]">
        <Skeleton className="h-full" />
      </section>
      <div className="h-95 space-y-5">
        <CardSkeleton />
        <Card className="h-full">
          <CardHeader className="gap-2"></CardHeader>
          <CardContent>
            <Skeleton className="h-[300px]" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
