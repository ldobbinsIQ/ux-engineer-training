"use client"

import Link from "next/link"
import { useProgress } from "@/hooks/useProgress"
import { getCompletionStats } from "@/lib/progress"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StreakBadge } from "./StreakBadge"
import { CheckCircle2, Clock } from "lucide-react"
import type { Module } from "@/types/content"

export function ProgressPageClient({ modules }: { modules: Module[] }) {
  const { progress } = useProgress()

  if (!progress) return <p className="text-muted-foreground text-sm">Loading…</p>

  const stats = getCompletionStats(progress, modules)
  const totalHours = modules.reduce((s, m) => s + m.estimatedHours, 0)
  const earnedHours = Math.round((stats.overallPercent / 100) * totalHours)

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Overall", value: `${stats.overallPercent}%` },
          { label: "Lessons done", value: `${stats.completedLessonsCount}/${stats.totalLessons}` },
          { label: "Modules done", value: `${stats.completedModulesCount}/${stats.totalModules}` },
          { label: "Est. hours", value: `${earnedHours}h` },
        ].map(({ label, value }) => (
          <Card key={label} size="sm">
            <CardContent className="text-center py-4">
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Streak */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Learning Streak</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <StreakBadge streak={progress.streak} size="lg" />
          {progress.history.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Recent activity</p>
              <div className="flex flex-wrap gap-1.5">
                {progress.history.slice(-30).map((date) => (
                  <div
                    key={date}
                    className="size-6 rounded bg-primary/80 flex items-center justify-center"
                    title={date}
                  >
                    <CheckCircle2 className="size-3 text-primary-foreground" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Per-module */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold">Module Progress</h2>
        <div className="space-y-3">
          {modules.map((mod) => {
            const pct = stats.modulePercents[mod.slug] ?? 0
            const done = !!progress.completedModules[mod.slug]
            return (
              <Link
                key={mod.slug}
                href={`/curriculum/${mod.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium truncate">{mod.title}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{pct}%</span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                </div>
                {done && <CheckCircle2 className="size-4 text-green-600 shrink-0" />}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
