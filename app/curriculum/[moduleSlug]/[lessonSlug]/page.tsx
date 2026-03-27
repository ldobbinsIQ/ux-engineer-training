import { notFound } from "next/navigation"
import Link from "next/link"
import { getLesson, getModule, getModules } from "@/lib/content"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { HiringSignalBadge } from "@/components/curriculum/HiringSignalBadge"
import { TaskChecklist } from "@/components/lesson/TaskChecklist"
import { LessonNotes } from "@/components/lesson/LessonNotes"
import { ResourceLinks } from "@/components/lesson/ResourceLinks"
import { MDXContent } from "@/components/MDXContent"

interface Props {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>
}

export async function generateStaticParams() {
  const modules = getModules()
  return modules.flatMap((m) =>
    m.lessons.map((l) => ({ moduleSlug: m.slug, lessonSlug: l.slug }))
  )
}

export default async function LessonPage({ params }: Props) {
  const { moduleSlug, lessonSlug } = await params
  const lesson = getLesson(moduleSlug, lessonSlug)
  const mod = getModule(moduleSlug)
  if (!lesson || !mod) notFound()

  const allLessons = mod.lessons
  const lessonIndex = allLessons.findIndex((l) => l.slug === lessonSlug)
  const prevLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null
  const nextLesson = lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null

  return (
    <div className="px-4 py-8 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8 items-start">
        {/* Main content */}
        <div className="space-y-6 min-w-0 overflow-hidden">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            <Link href="/curriculum" className="hover:text-foreground">Curriculum</Link>
            <span>/</span>
            <Link href={`/curriculum/${moduleSlug}`} className="hover:text-foreground">{mod.title}</Link>
            <span>/</span>
            <span className="text-foreground">{lesson.title}</span>
          </nav>

          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              {lesson.hiringSignal && (
                <HiringSignalBadge category={lesson.hiringSignalCategory} />
              )}
              <Badge variant="outline" className="gap-1 text-xs">
                <Clock className="size-3" />
                {lesson.estimatedHours}h
              </Badge>
            </div>
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
          </div>

          {/* MDX Content */}
          {lesson.content && (
            <div className="min-w-0 overflow-hidden">
              <MDXContent source={lesson.content} />
            </div>
          )}

          {/* Prev / Next */}
          <div className="flex justify-between pt-4 border-t gap-4">
            {prevLesson ? (
              <Link
                href={`/curriculum/${moduleSlug}/${prevLesson.slug}`}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-3.5" />
                {prevLesson.title}
              </Link>
            ) : (
              <Link
                href={`/curriculum/${moduleSlug}`}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-3.5" />
                Module overview
              </Link>
            )}
            {nextLesson && (
              <Link
                href={`/curriculum/${moduleSlug}/${nextLesson.slug}`}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
              >
                {nextLesson.title}
                <ArrowRight className="size-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Sidebar — stacks below on mobile/tablet, sticky on lg+ */}
        <aside className="space-y-6 w-full min-w-0 lg:sticky lg:top-8 lg:self-start">
          <TaskChecklist
            lessonSlug={lesson.slug}
            moduleSlug={moduleSlug}
            tasks={lesson.tasks}
            allLessons={allLessons.map((l) => ({ slug: l.slug, tasks: l.tasks }))}
          />
          <ResourceLinks resources={lesson.resources} />
          <LessonNotes lessonSlug={lesson.slug} />
        </aside>
      </div>
    </div>
  )
}
