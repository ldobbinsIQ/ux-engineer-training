"use client"

import Link from "next/link"
import { useProgress } from "@/hooks/useProgress"
import { getCompletionStats } from "@/lib/progress"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2 } from "lucide-react"
import type { Module } from "@/types/content"

interface ModuleProgressGridClientProps {
  modules: Module[]
}

export function ModuleProgressGridClient({ modules }: ModuleProgressGridClientProps) {
  const { progress } = useProgress()
  const stats = progress ? getCompletionStats(progress, modules) : null

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {modules.map((mod, i) => {
        const pct = stats?.modulePercents[mod.slug] ?? 0
        const done = pct === 100
        return (
          <Link
            key={mod.slug}
            href={`/curriculum/${mod.slug}`}
            className="flex flex-col gap-2 p-3 rounded-lg border bg-card hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              {done && <CheckCircle2 className="size-3.5 text-green-600 shrink-0" />}
            </div>
            <p className="font-medium leading-snug line-clamp-2 text-xs">{mod.title}</p>
            <div className="flex items-center gap-2">
              <Progress value={pct} className="h-1 flex-1" />
              <span className="text-xs text-muted-foreground w-8 text-right">{pct}%</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
