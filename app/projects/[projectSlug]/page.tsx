import { notFound } from "next/navigation"
import Link from "next/link"
import { getProject, getProjects } from "@/lib/content"
import { ArrowLeft, Clock, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { HiringSignalBadge } from "@/components/curriculum/HiringSignalBadge"
import { ProjectCompletionWrapper } from "@/components/projects/ProjectCompletionWrapper"
import { MDXContent } from "@/components/MDXContent"

interface Props {
  params: Promise<{ projectSlug: string }>
}

export async function generateStaticParams() {
  const projects = getProjects()
  return projects.map((p) => ({ projectSlug: p.slug }))
}

export default async function ProjectPage({ params }: Props) {
  const { projectSlug } = await params
  const project = getProject(projectSlug)
  if (!project) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Projects
      </Link>

      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          {project.isCapstone && (
            <Badge className="bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900 dark:text-amber-200">
              Capstone
            </Badge>
          )}
          {project.hiringSignal && (
            <HiringSignalBadge category={project.hiringSignalCategory} />
          )}
          <Badge variant="outline" className="gap-1 text-xs">
            <Clock className="size-3" />
            {project.estimatedHours}h
          </Badge>
        </div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <ProjectCompletionWrapper slug={project.slug} showToggle />
        </div>
        {project.deliverables.length > 0 && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm">
            <Package className="size-4 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">Deliverables</p>
              <ul className="space-y-0.5 text-muted-foreground text-xs">
                {project.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1 size-1 rounded-full bg-muted-foreground shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {project.content && <MDXContent source={project.content} />}
    </div>
  )
}
