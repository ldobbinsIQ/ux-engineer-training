"use client"

import { useProgress } from "@/hooks/useProgress"
import { CheckCircle2, Circle } from "lucide-react"

interface Props {
  slug: string
  showToggle?: boolean
}

export function ProjectCompletionWrapper({ slug, showToggle = false }: Props) {
  const { isProjectComplete, toggleProject } = useProgress()
  const done = isProjectComplete(slug)

  if (showToggle) {
    return (
      <button
        onClick={() => toggleProject(slug)}
        className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-pressed={done}
      >
        {done ? (
          <CheckCircle2 className="size-4 text-green-600" />
        ) : (
          <Circle className="size-4 text-muted-foreground" />
        )}
        {done ? "Completed" : "Mark complete"}
      </button>
    )
  }

  return done ? (
    <CheckCircle2 className="size-4 text-green-600 shrink-0" />
  ) : null
}
