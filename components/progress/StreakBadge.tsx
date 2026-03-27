import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface StreakBadgeProps {
  streak: number
  size?: "sm" | "lg"
}

export function StreakBadge({ streak, size = "sm" }: StreakBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-4 py-2 text-base",
        streak > 0
          ? "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400"
          : "bg-muted text-muted-foreground"
      )}
    >
      <Flame className={cn(size === "sm" ? "size-3.5" : "size-5", streak > 0 && "fill-orange-400 text-orange-500")} />
      {streak > 0 ? `${streak} day streak` : "No streak yet"}
    </div>
  )
}
