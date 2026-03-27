import { getModules } from "@/lib/content"
import { NotesPageClient } from "@/components/notes/NotesPageClient"

export default function NotesPage() {
  const modules = getModules()
  const lessons = modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleSlug: m.slug, moduleTitle: m.title }))
  )
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Notes</h1>
        <p className="text-muted-foreground text-sm">All your saved lesson notes in one place.</p>
      </div>
      <NotesPageClient lessons={lessons} />
    </div>
  )
}
