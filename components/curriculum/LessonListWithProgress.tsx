"use client"

import { useProgress } from "@/hooks/useProgress"
import { LessonCard } from "./LessonCard"
import type { LessonFrontmatter } from "@/types/content"

interface Props {
  lessons: LessonFrontmatter[]
  moduleSlug: string
}

export function LessonListWithProgress({ lessons, moduleSlug }: Props) {
  const { isLessonComplete } = useProgress()

  return (
    <div className="space-y-2">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.slug}
          lesson={lesson}
          moduleSlug={moduleSlug}
          isComplete={isLessonComplete(lesson.slug)}
        />
      ))}
    </div>
  )
}
