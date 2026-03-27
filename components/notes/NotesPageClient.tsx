"use client"

import { useState } from "react"
import Link from "next/link"
import { useProgress } from "@/hooks/useProgress"
import { Input } from "@/components/ui/input"
import { Search, StickyNote, ExternalLink } from "lucide-react"

interface LessonEntry {
  slug: string
  title: string
  moduleSlug: string
  moduleTitle: string
}

export function NotesPageClient({ lessons }: { lessons: LessonEntry[] }) {
  const { getNote } = useProgress()
  const [filter, setFilter] = useState("")

  const withNotes = lessons.filter((l) => {
    const note = getNote(l.slug)
    return note.trim().length > 0
  })

  const filtered = filter
    ? withNotes.filter(
        (l) =>
          l.title.toLowerCase().includes(filter.toLowerCase()) ||
          getNote(l.slug).toLowerCase().includes(filter.toLowerCase())
      )
    : withNotes

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter notes…"
          className="pl-8"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <StickyNote className="size-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            {withNotes.length === 0
              ? "No notes yet. Open any lesson and start writing in the Notes panel."
              : "No notes match your filter."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((l) => {
            const note = getNote(l.slug)
            return (
              <div key={l.slug} className="p-4 rounded-xl border bg-card space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">{l.moduleTitle}</p>
                    <p className="font-medium text-sm">{l.title}</p>
                  </div>
                  <Link
                    href={`/curriculum/${l.moduleSlug}/${l.slug}`}
                    className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    aria-label="Open lesson"
                  >
                    <ExternalLink className="size-3.5" />
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground whitespace-pre-wrap font-mono line-clamp-4">
                  {note}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
