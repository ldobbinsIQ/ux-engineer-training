import { CheckCircle } from "lucide-react"

interface QuickSummaryProps {
  points?: string[]
}

export function QuickSummary({ points = [] }: QuickSummaryProps) {
  if (!points || points.length === 0) return null
  return (
    <div className="not-prose my-6 rounded-xl border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b bg-muted/30 flex items-center gap-2">
        <CheckCircle className="size-4 text-green-500 shrink-0" />
        <p className="text-sm font-semibold text-foreground">Quick Summary</p>
      </div>
      <ul className="divide-y">
        {points.map((point, i) => (
          <li key={i} className="px-4 py-3 flex items-start gap-3">
            <span className="size-5 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="text-sm text-foreground">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
