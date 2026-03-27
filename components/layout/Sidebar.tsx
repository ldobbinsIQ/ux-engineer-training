"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  TrendingUp,
  StickyNote,
  Settings,
  Rocket,
  GraduationCap,
  BookMarked,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/start", label: "Start Here", icon: Rocket },
  { href: "/curriculum", label: "Curriculum", icon: BookOpen },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/progress", label: "Progress", icon: TrendingUp },
  { href: "/notes", label: "Notes", icon: StickyNote },
  { href: "/glossary", label: "Glossary", icon: BookMarked },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r bg-sidebar min-h-screen sticky top-0">
      <div className="flex items-center gap-2 px-5 py-4 border-b">
        <GraduationCap className="size-5 text-primary" />
        <span className="font-semibold text-sm">UXE Training</span>
      </div>
      <nav className="flex flex-col gap-0.5 p-3 flex-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="px-5 py-4 border-t">
        <p className="text-xs text-muted-foreground">South Bay UXE Track</p>
      </div>
    </aside>
  )
}
