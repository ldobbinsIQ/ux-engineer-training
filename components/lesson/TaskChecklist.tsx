"use client"

import { useProgress } from "@/hooks/useProgress"
import { cn } from "@/lib/utils"
import { CheckSquare2, Square } from "lucide-react"

interface TaskChecklistProps {
  lessonSlug: string
  moduleSlug: string
  tasks: string[]
  allLessons: { slug: string; tasks: string[] }[]
}

export function TaskChecklist({ lessonSlug, moduleSlug, tasks, allLessons }: TaskChecklistProps) {
  const { isTaskComplete, toggleTask } = useProgress()

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Lesson Tasks
      </h2>
      <ul className="space-y-1.5">
        {tasks.map((task, i) => {
          const done = isTaskComplete(lessonSlug, i)
          return (
            <li key={i}>
              <button
                onClick={() => toggleTask(lessonSlug, i, tasks.length, moduleSlug, allLessons)}
                className={cn(
                  "flex items-start gap-2.5 w-full text-left rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  done
                    ? "bg-green-50 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                    : "bg-muted/50 hover:bg-muted text-foreground"
                )}
                aria-pressed={done}
                aria-label={`${done ? "Unmark" : "Mark"} task: ${task}`}
              >
                {done ? (
                  <CheckSquare2 className="size-4 shrink-0 mt-0.5 text-green-600" />
                ) : (
                  <Square className="size-4 shrink-0 mt-0.5 text-muted-foreground" />
                )}
                <span className={cn(done && "line-through opacity-70")}>{task}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="text-xs text-muted-foreground pt-1">
        {tasks.filter((_, i) => isTaskComplete(lessonSlug, i)).length} / {tasks.length} completed
      </p>
    </div>
  )
}
