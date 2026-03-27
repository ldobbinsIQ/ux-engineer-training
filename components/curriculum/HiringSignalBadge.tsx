import { Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface HiringSignalBadgeProps {
  category?: string
  size?: "sm" | "default"
}

export function HiringSignalBadge({ category, size = "default" }: HiringSignalBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1 border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400",
        size === "sm" && "text-[10px] h-4 px-1.5"
      )}
    >
      <Zap className="size-3 fill-current" />
      {category ?? "Hiring Signal"}
    </Badge>
  )
}
