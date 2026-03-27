import Link from "next/link"
import { getProjects } from "@/lib/content"
import { Clock, ExternalLink, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HiringSignalBadge } from "@/components/curriculum/HiringSignalBadge"
import { ProjectCompletionWrapper } from "@/components/projects/ProjectCompletionWrapper"

export default function ProjectsPage() {
  const projects = getProjects()
  const regular = projects.filter((p) => !p.isCapstone)
  const capstone = projects.find((p) => p.isCapstone)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-muted-foreground text-sm">
          Build portfolio-ready artifacts that map to real UX Engineer expectations.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {regular.map((proj) => (
          <Link
            key={proj.slug}
            href={`/projects/${proj.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
          >
            <Card className="h-full hover:shadow-md transition-shadow group">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm">{proj.title}</CardTitle>
                  <ProjectCompletionWrapper slug={proj.slug} />
                </div>
                {proj.hiringSignal && (
                  <HiringSignalBadge category={proj.hiringSignalCategory} size="sm" />
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {proj.estimatedHours}h estimated
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Deliverables</p>
                  <ul className="space-y-0.5">
                    {proj.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <span className="mt-1 size-1 rounded-full bg-muted-foreground shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {capstone && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="size-4 text-amber-500 fill-amber-400" />
            <h2 className="text-base font-semibold">Capstone Project</h2>
          </div>
          <Link
            href={`/projects/${capstone.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl block"
          >
            <Card className="hover:shadow-md transition-shadow border-amber-200 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>{capstone.title}</CardTitle>
                  <ProjectCompletionWrapper slug={capstone.slug} />
                </div>
                <CardDescription>
                  Combines design system + dashboard + AI assistant into one cohesive mini product.
                  Includes a case study generator that outputs portfolio-ready markdown.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline" className="gap-1 text-xs">
                  <Clock className="size-3" />
                  {capstone.estimatedHours}h estimated
                </Badge>
                <Badge variant="secondary" className="text-xs">Portfolio capstone</Badge>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
    </div>
  )
}
