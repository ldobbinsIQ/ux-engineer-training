import { getModules, getSearchIndex } from "@/lib/content"
import { ModuleCard } from "@/components/curriculum/ModuleCard"
import { SearchBar } from "@/components/search/SearchBar"
import { ModuleCompletionWrapper } from "@/components/curriculum/ModuleCompletionWrapper"

export default function CurriculumPage() {
  const modules = getModules()
  const searchIndex = getSearchIndex()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Curriculum</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {modules.length} modules · {modules.reduce((s, m) => s + m.lessons.length, 0)} lessons ·{" "}
            {modules.reduce((s, m) => s + m.estimatedHours, 0)}h total
          </p>
        </div>
        <SearchBar index={searchIndex} />
      </div>

      <ModuleCompletionWrapper modules={modules} />
    </div>
  )
}
