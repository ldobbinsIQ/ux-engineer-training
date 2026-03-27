"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TermTooltipProps {
  term: string
  definition: string
  children?: React.ReactNode
}

export function TermTooltip({ term, definition, children }: TermTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="cursor-help underline decoration-dotted decoration-muted-foreground/60 underline-offset-2 font-medium bg-transparent border-none p-0 text-inherit"
        >
          {children ?? term}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="font-semibold mb-0.5">{term}</p>
          <p className="text-xs opacity-90">{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
