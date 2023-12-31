"use client"

import { MainNavItem } from "@/types"

import { MainNav } from "@/components/main-nav"

interface Props {
  children: React.ReactNode
  mainNav: MainNavItem[]
}

export function Navbar({ children, mainNav }: Props) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">{children}</nav>
        </div>
      </div>
    </header>
  )
}
