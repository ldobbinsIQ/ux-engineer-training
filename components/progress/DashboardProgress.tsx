"use client"

import { useProgress } from "@/hooks/useProgress"
import { getCompletionStats } from "@/lib/progress"
import { Progress } from "@/components/ui/progress"
import type { Module } from "@/types/content"

interface DashboardProgressProps {
  modules: Module[]
}

export function DashboardProgress({ modules }: DashboardProgressProps) {
  const { progress } = useProgress()

  if (!progress) {
    return <Progress value={0} className="h-2" />
  }

  const stats = getCompletionStats(progress, modules)

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-baseline">
        <span className="text-3xl font-bold">{stats.overallPercent}%</span>
        <span className="text-xs text-muted-foreground">
          {stats.completedTasksCount} / {stats.totalTasks} tasks
        </span>
      </div>
      <Progress value={stats.overallPercent} className="h-2" />
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <p className="font-semibold text-base">{stats.completedLessonsCount}</p>
          <p className="text-muted-foreground">Lessons done</p>
        </div>
        <div>
          <p className="font-semibold text-base">{stats.completedModulesCount}</p>
          <p className="text-muted-foreground">Modules done</p>
        </div>
        <div>
          <p className="font-semibold text-base">{stats.totalLessons}</p>
          <p className="text-muted-foreground">Total lessons</p>
        </div>
      </div>
    </div>
  )
}
