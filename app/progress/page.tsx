import { getModules } from "@/lib/content"
import { ProgressPageClient } from "@/components/progress/ProgressPageClient"

export default function ProgressPage() {
  const modules = getModules()
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Progress</h1>
        <p className="text-muted-foreground text-sm">Track your learning journey.</p>
      </div>
      <ProgressPageClient modules={modules} />
    </div>
  )
}
