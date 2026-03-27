"use client"

import { useState, useEffect, useRef } from "react"
import { useProgress } from "@/hooks/useProgress"
import { Textarea } from "@/components/ui/textarea"
import { StickyNote } from "lucide-react"

interface LessonNotesProps {
  lessonSlug: string
}

export function LessonNotes({ lessonSlug }: LessonNotesProps) {
  const { getNote, saveNote } = useProgress()
  const [value, setValue] = useState("")
  const [saved, setSaved] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setValue(getNote(lessonSlug))
  }, [lessonSlug, getNote])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value
    setValue(v)
    setSaved(false)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      saveNote(lessonSlug, v)
      setSaved(true)
    }, 800)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
          <StickyNote className="size-3.5" />
          My Notes
        </h2>
        {saved && (
          <span className="text-xs text-green-600">Saved</span>
        )}
      </div>
      <Textarea
        value={value}
        onChange={handleChange}
        placeholder="Write anything you want to remember about this lesson…"
        className="min-h-[160px] text-sm resize-y font-mono"
        aria-label="Lesson notes"
      />
      <p className="text-xs text-muted-foreground">Notes auto-save locally as you type.</p>
    </div>
  )
}
