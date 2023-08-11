import { ControlPanelHeader } from "@/components/header"
import { ControlPanelShell } from "@/components/shell"
import { CardSkeleton } from "@/app/(dashboard)/dashboard/loading"

export default function ProfileLoading() {
  return (
    <ControlPanelShell>
      <ControlPanelHeader heading="Profile" text="Manage your posts" />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </ControlPanelShell>
  )
}
