import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/utils/supabase-server"

import { dashboardConfig } from "@/config/dashboard"
import { getServerSession } from "@/lib/session"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserAccountNav } from "@/components/user-account-nav"

import { getUserProfile } from "../actions"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession()

  if (!session) redirect("/login")

  const profile = await getUserProfile(session.user.id)

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <Navbar mainNav={dashboardConfig.mainNav}>
        <ThemeToggle />
        <UserAccountNav
          user={{
            username: profile?.username ?? null,
            full_name: profile?.full_name ?? null,
            image: profile?.avatar_url ?? null,
            email: session.user.email ?? null,
          }}
        />
      </Navbar>
      <div className="grow sm:container sm:flex-1">
        <main className="relative flex w-full flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
