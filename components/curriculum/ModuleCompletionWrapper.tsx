"use client"

import { useProgress } from "@/hooks/useProgress"
import { getCompletionStats } from "@/lib/progress"
import { ModuleCard } from "./ModuleCard"
import type { Module } from "@/types/content"

export function ModuleCompletionWrapper({ modules }: { modules: Module[] }) {
  const { progress } = useProgress()
  const stats = progress ? getCompletionStats(progress, modules) : null

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {modules.map((mod) => (
        <ModuleCard
          key={mod.slug}
          module={{ ...mod, lessonCount: mod.lessons.length }}
          completionPercent={stats?.modulePercents[mod.slug] ?? 0}
          isComplete={!!progress?.completedModules[mod.slug]}
          order={mod.order}
        />
      ))}
    </div>
  )
}
