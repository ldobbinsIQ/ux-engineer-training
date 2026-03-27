"use client"

import { PlayCircle, ExternalLink, Clock } from "lucide-react"

interface VideoEmbedProps {
  title: string
  youtubeId?: string
  fallbackSearchUrl?: string
  duration?: string
  watchFirst?: boolean
  suggestedTerms?: string
}

export function VideoEmbed({
  title,
  youtubeId,
  fallbackSearchUrl,
  duration,
  watchFirst = false,
  suggestedTerms,
}: VideoEmbedProps) {
  return (
    <div className="not-prose my-6 rounded-xl border bg-card overflow-hidden">
      {watchFirst && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center gap-2">
          <PlayCircle className="size-4 text-amber-600 shrink-0" />
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
            Watch First
          </span>
        </div>
      )}

      {youtubeId ? (
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex items-center gap-4 p-4 bg-muted/30">
          <div className="size-16 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
            <PlayCircle className="size-8 text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            {suggestedTerms && (
              <p className="text-xs text-muted-foreground mb-1">
                Suggested search:{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-xs">{suggestedTerms}</code>
              </p>
            )}
            {fallbackSearchUrl && (
              <a
                href={fallbackSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Open YouTube search
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>
        </div>
      )}

      <div className="px-4 py-3 flex items-center justify-between gap-2 border-t">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {duration && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
            <Clock className="size-3.5" />
            {duration}
          </span>
        )}
      </div>
    </div>
  )
}
