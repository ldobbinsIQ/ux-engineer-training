"use client"

import Link from "next/link"
import { useProgress } from "@/hooks/useProgress"
import { CheckCircle2, Circle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Module } from "@/types/content"

interface TodayTasksProps {
  modules: Module[]
}

export function TodayTasks({ modules }: TodayTasksProps) {
  const { progress, toggleTask, isTaskComplete } = useProgress()

  if (!progress) return null

  // Find next incomplete lesson
  let nextLesson: { moduleSlug: string; lesson: { slug: string; tasks: string[]; title: string } } | null = null
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      const allDone = lesson.tasks.every((_, i) => isTaskComplete(lesson.slug, i))
      if (!allDone) {
        nextLesson = { moduleSlug: mod.slug, lesson }
        break
      }
    }
    if (nextLesson) break
  }

  if (!nextLesson) {
    return (
      <div className="rounded-xl border bg-green-50 dark:bg-green-950/20 p-4 text-center">
        <CheckCircle2 className="size-8 text-green-600 mx-auto mb-2" />
        <p className="text-sm font-medium">All tasks complete!</p>
        <p className="text-xs text-muted-foreground mt-1">Check out the projects to keep building.</p>
      </div>
    )
  }

  const { moduleSlug, lesson } = nextLesson
  const allLessons = modules.find(m => m.slug === moduleSlug)?.lessons ?? []
  const todayTasks = lesson.tasks.slice(0, 3)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Up next</p>
        <Link
          href={`/curriculum/${moduleSlug}/${lesson.slug}`}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          View lesson <ArrowRight className="size-3" />
        </Link>
      </div>
      <p className="text-sm font-medium">{lesson.title}</p>
      <ul className="space-y-1.5">
        {todayTasks.map((task, i) => {
          const done = isTaskComplete(lesson.slug, i)
          return (
            <li key={i}>
              <button
                onClick={() =>
                  toggleTask(lesson.slug, i, lesson.tasks.length, moduleSlug, allLessons.map(l => ({ slug: l.slug, tasks: l.tasks })))
                }
                className={cn(
                  "flex items-start gap-2 w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors",
                  done ? "text-muted-foreground" : "hover:bg-muted"
                )}
                aria-pressed={done}
              >
                {done ? (
                  <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-green-600" />
                ) : (
                  <Circle className="size-4 shrink-0 mt-0.5 text-muted-foreground" />
                )}
                <span className={cn(done && "line-through opacity-60")}>{task}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
