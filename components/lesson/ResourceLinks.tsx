import { PlayCircle, BookOpen, ExternalLink } from "lucide-react"
import type { LessonResources } from "@/types/content"

interface ResourceLinksProps {
  resources: LessonResources
}

export function ResourceLinks({ resources }: ResourceLinksProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Resources
      </h2>
      {resources.youtube.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <PlayCircle className="size-3.5 text-red-500" />
            YouTube
          </p>
          {resources.youtube.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
            >
              <span className="text-sm">{r.label}</span>
              <ExternalLink className="size-3.5 text-muted-foreground shrink-0 group-hover:text-foreground" />
            </a>
          ))}
        </div>
      )}
      {resources.docs.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <BookOpen className="size-3.5 text-blue-500" />
            Documentation
          </p>
          {resources.docs.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
            >
              <span className="text-sm">{r.label}</span>
              <ExternalLink className="size-3.5 text-muted-foreground shrink-0 group-hover:text-foreground" />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
