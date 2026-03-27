import Link from "next/link"
import { Clock, CheckCircle2, Circle, ChevronRight } from "lucide-react"
import { HiringSignalBadge } from "./HiringSignalBadge"
import { cn } from "@/lib/utils"
import type { LessonFrontmatter } from "@/types/content"

interface LessonCardProps {
  lesson: LessonFrontmatter
  moduleSlug: string
  isComplete?: boolean
}

export function LessonCard({ lesson, moduleSlug, isComplete = false }: LessonCardProps) {
  return (
    <Link
      href={`/curriculum/${moduleSlug}/${lesson.slug}`}
      className={cn(
        "group flex items-center gap-3 p-3 rounded-lg border bg-card transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isComplete && "border-green-200 bg-green-50/30 dark:border-green-900 dark:bg-green-950/20"
      )}
    >
      {isComplete ? (
        <CheckCircle2 className="size-4 text-green-600 shrink-0" />
      ) : (
        <Circle className="size-4 text-muted-foreground shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-snug truncate">{lesson.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <Clock className="size-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{lesson.estimatedHours}h</span>
          {lesson.hiringSignal && (
            <HiringSignalBadge category={lesson.hiringSignalCategory} size="sm" />
          )}
        </div>
      </div>
      <ChevronRight className="size-4 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}
