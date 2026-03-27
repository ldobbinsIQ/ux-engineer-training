import { notFound } from "next/navigation"
import Link from "next/link"
import { getModule, getModules } from "@/lib/content"
import { Clock, ArrowLeft, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { HiringSignalBadge } from "@/components/curriculum/HiringSignalBadge"
import { LessonListWithProgress } from "@/components/curriculum/LessonListWithProgress"
import { MDXContent } from "@/components/MDXContent"

interface Props {
  params: Promise<{ moduleSlug: string }>
}

export async function generateStaticParams() {
  const modules = getModules()
  return modules.map((m) => ({ moduleSlug: m.slug }))
}

export default async function ModulePage({ params }: Props) {
  const { moduleSlug } = await params
  const mod = getModule(moduleSlug)
  if (!mod) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/curriculum"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Curriculum
      </Link>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">
            Module {String(mod.order).padStart(2, "0")}
          </span>
          {mod.hiringSignal && (
            <HiringSignalBadge category={mod.hiringSignalCategory} />
          )}
        </div>
        <h1 className="text-2xl font-bold">{mod.title}</h1>
        <p className="text-muted-foreground">{mod.description}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="outline" className="gap-1 text-xs">
            <Clock className="size-3" />
            {mod.estimatedHours}h estimated
          </Badge>
          <Badge variant="outline" className="text-xs">
            {mod.lessons.length} lessons
          </Badge>
        </div>
        <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm">
          <Package className="size-4 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <span className="font-medium">Deliverable: </span>
            <span className="text-muted-foreground">{mod.deliverable}</span>
          </div>
        </div>
      </div>

      {mod.content && (
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <MDXContent source={mod.content} />
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-base font-semibold">Lessons</h2>
        <LessonListWithProgress lessons={mod.lessons} moduleSlug={mod.slug} />
      </div>
    </div>
  )
}
