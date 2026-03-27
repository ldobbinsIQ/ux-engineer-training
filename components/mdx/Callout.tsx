import { cn } from "@/lib/utils"
import { Info, Lightbulb, AlertTriangle, Zap, Link } from "lucide-react"

type CalloutVariant = "what" | "why" | "ux-connection" | "mistakes" | "tip" | "warning"

interface CalloutProps {
  variant?: CalloutVariant
  title?: string
  children: React.ReactNode
}

const variantConfig: Record<
  CalloutVariant,
  { icon: React.ElementType; label: string; classes: string }
> = {
  what: {
    icon: Info,
    label: "What this is",
    classes: "bg-blue-500/8 border-blue-500/20 text-blue-900 dark:text-blue-100 [&_svg]:text-blue-500",
  },
  why: {
    icon: Zap,
    label: "Why it matters for UX Engineers",
    classes: "bg-amber-500/8 border-amber-500/20 text-amber-900 dark:text-amber-100 [&_svg]:text-amber-500",
  },
  "ux-connection": {
    icon: Link,
    label: "How it connects to your UX background",
    classes: "bg-purple-500/8 border-purple-500/20 text-purple-900 dark:text-purple-100 [&_svg]:text-purple-500",
  },
  mistakes: {
    icon: AlertTriangle,
    label: "Common mistakes",
    classes: "bg-red-500/8 border-red-500/20 text-red-900 dark:text-red-100 [&_svg]:text-red-500",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    classes: "bg-green-500/8 border-green-500/20 text-green-900 dark:text-green-100 [&_svg]:text-green-500",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    classes: "bg-orange-500/8 border-orange-500/20 text-orange-900 dark:text-orange-100 [&_svg]:text-orange-500",
  },
}

export function Callout({ variant = "tip", title, children }: CalloutProps) {
  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "not-prose my-5 rounded-xl border p-4",
        config.classes
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className="size-4 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold mb-1">{title ?? config.label}</p>
          <div className="text-sm [&_ul]:mt-2 [&_ul]:space-y-1 [&_li]:leading-snug [&_p]:leading-snug [&_p+p]:mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
