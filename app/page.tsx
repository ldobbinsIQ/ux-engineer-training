import Link from "next/link"
import { getModules } from "@/lib/content"
import { BookOpen, FolderKanban, Rocket, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StreakBadgeClient } from "@/components/progress/StreakBadgeClient"
import { DashboardProgress } from "@/components/progress/DashboardProgress"
import { TodayTasks } from "@/components/progress/TodayTasks"
import { ModuleProgressGridClient } from "@/components/progress/ModuleProgressGridClient"

export default async function DashboardPage() {
  const modules = getModules()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">South Bay UX Engineer Track</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="sm:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground font-normal">Daily Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <StreakBadgeClient />
          </CardContent>
        </Card>
        <Card className="sm:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardProgress modules={modules} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Today&apos;s Tasks</CardTitle>
            <Link href="/curriculum" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="size-3" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <TodayTasks modules={modules} />
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/start" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
          <Card className="h-full hover:shadow-md transition-shadow group">
            <CardContent className="flex flex-col items-center text-center gap-2 py-6">
              <Rocket className="size-8 text-primary group-hover:scale-110 transition-transform" />
              <p className="font-medium text-sm">Start Here</p>
              <p className="text-xs text-muted-foreground">Onboarding guide and schedule</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/curriculum" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
          <Card className="h-full hover:shadow-md transition-shadow group">
            <CardContent className="flex flex-col items-center text-center gap-2 py-6">
              <BookOpen className="size-8 text-blue-500 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-sm">Curriculum</p>
              <p className="text-xs text-muted-foreground">
                {modules.length} modules · {modules.reduce((s, m) => s + m.lessons.length, 0)} lessons
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/projects" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
          <Card className="h-full hover:shadow-md transition-shadow group">
            <CardContent className="flex flex-col items-center text-center gap-2 py-6">
              <FolderKanban className="size-8 text-purple-500 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-sm">Projects</p>
              <p className="text-xs text-muted-foreground">4 projects + 1 capstone</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Modules</h2>
          <Link href="/curriculum">
            <Button variant="ghost" size="sm" className="text-xs">
              View all <ArrowRight className="size-3 ml-1" />
            </Button>
          </Link>
        </div>
        <ModuleProgressGridClient modules={modules} />
      </div>
    </div>
  )
}
