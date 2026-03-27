import Link from "next/link"
import { Clock, ChevronRight, CheckCircle2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { HiringSignalBadge } from "./HiringSignalBadge"
import type { ModuleFrontmatter } from "@/types/content"

interface ModuleCardProps {
  module: ModuleFrontmatter & { lessonCount?: number }
  completionPercent?: number
  isComplete?: boolean
  order: number
}

export function ModuleCard({ module, completionPercent = 0, isComplete = false, order }: ModuleCardProps) {
  return (
    <Link href={`/curriculum/${module.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-xs font-mono text-muted-foreground shrink-0">
                {String(order).padStart(2, "0")}
              </span>
              <CardTitle className="text-sm leading-snug">{module.title}</CardTitle>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {isComplete && <CheckCircle2 className="size-4 text-green-600" />}
              <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
          {module.hiringSignal && (
            <HiringSignalBadge category={module.hiringSignalCategory} size="sm" />
          )}
          <CardDescription className="line-clamp-2 text-xs mt-1">{module.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Clock className="size-3" />
            <span>{module.estimatedHours}h estimated</span>
            {module.lessonCount !== undefined && (
              <span>· {module.lessonCount} lessons</span>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{completionPercent}%</span>
            </div>
            <Progress value={completionPercent} className="h-1.5" />
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground/70">Deliverable:</span>&nbsp;{module.deliverable}
        </CardFooter>
      </Card>
    </Link>
  )
}
