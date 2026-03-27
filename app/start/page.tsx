import Link from "next/link"
import { Rocket, Clock, Target, BookOpen, FolderKanban, TrendingUp, CheckSquare2, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function StartPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Rocket className="size-6 text-primary" />
          <h1 className="text-2xl font-bold">Welcome to the South Bay UXE Track</h1>
        </div>
        <p className="text-muted-foreground text-base leading-relaxed">
          This program is built for people who already know UX — and want to learn how to build it.
          You&apos;ll go from understanding design to shipping production-quality front-end code:
          React, TypeScript, accessibility, design systems, and more.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed">
          Every lesson is practical. Every module has a deliverable. Every project maps to something
          real that Bay Area teams hire for.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link href="/curriculum">
            <Button size="sm">
              <BookOpen className="size-4" />
              Browse Curriculum
            </Button>
          </Link>
          <Link href="/">
            <Button size="sm" variant="outline">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* What this program covers */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">What this program covers</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: "HTML & CSS for production UI", detail: "Semantic markup, forms, layouts, tokens, motion" },
            { label: "JavaScript & TypeScript", detail: "DOM behavior, typed components, safe data flow" },
            { label: "React & Next.js", detail: "Component composition, App Router, data fetching" },
            { label: "Accessibility", detail: "WCAG habits, keyboard nav, ARIA, audit skills" },
            { label: "Design Systems", detail: "Component libraries, Storybook, tokens, theming" },
            { label: "Prototyping & Polish", detail: "Realistic interactions, bridging design to code" },
            { label: "Data-Dense UI", detail: "Tables, filters, dashboards, enterprise patterns" },
            { label: "AI Interface Patterns", detail: "Chat UX, streaming, citations, safe empty states" },
            { label: "Testing & Quality", detail: "Component tests, E2E, accessibility regression" },
            { label: "Portfolio Readiness", detail: "Case studies, READMEs, interview prep" },
          ].map(({ label, detail }) => (
            <div key={label} className="flex gap-2.5 p-3 rounded-lg border bg-card text-sm">
              <CheckSquare2 className="size-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hiring Signals */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="size-4 text-amber-500 fill-amber-400" />
          Hiring Signal labels
        </h2>
        <p className="text-sm text-muted-foreground">
          Lessons and projects marked with a{" "}
          <Badge variant="secondary" className="mx-1 border-amber-200 bg-amber-50 text-amber-700">
            <Zap className="size-3 fill-current" /> Hiring Signal
          </Badge>{" "}
          badge map directly to what UX Engineer job descriptions ask for. Prioritize these if
          you&apos;re on a tight timeline.
        </p>
        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          {[
            "React + TypeScript",
            "Accessibility",
            "Design Systems",
            "Prototyping + Polish",
            "Data-Dense UI",
            "AI Interface Patterns",
          ].map((cat) => (
            <Badge key={cat} variant="outline" className="justify-start">
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* How to use */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">How to use this app</h2>
        <div className="space-y-3">
          {[
            {
              icon: LayoutGrid,
              title: "Dashboard",
              desc: "Check your streak and see the next 1–3 tasks from your current lesson.",
            },
            {
              icon: BookOpen,
              title: "Curriculum",
              desc: "Browse 14 modules in order. Each module has 3–6 lessons. Read, practice, check off tasks.",
            },
            {
              icon: FolderKanban,
              title: "Projects",
              desc: "Build 4 standalone projects + 1 capstone. Each one produces a portfolio artifact.",
            },
            {
              icon: TrendingUp,
              title: "Progress",
              desc: "See your overall completion %, per-module progress, streak history, and hours estimate.",
            },
            {
              icon: StickyNote,
              title: "Notes",
              desc: "Each lesson has a notes panel. Jot down anything worth keeping — saved locally.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-3 text-sm">
              <div className="size-7 rounded-md bg-muted flex items-center justify-center shrink-0">
                <Icon className="size-3.5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="size-4" />
            Recommended weekly schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            Aim for <strong>8–10 hours per week</strong>. At that pace you&apos;ll complete the full
            curriculum in roughly 16 weeks (4 months).
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Mon / Wed / Fri", detail: "1 lesson each (~1–2h) — read + do tasks" },
              { label: "Saturday", detail: "Work on the active module project (2–3h)" },
              { label: "Sunday", detail: "Review notes, push code, write README entry" },
              { label: "Any day", detail: "Check Dashboard to stay on streak" },
            ].map(({ label, detail }) => (
              <div key={label} className="p-3 rounded-lg border">
                <p className="font-medium">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
              </div>
            ))}
          </div>
          <div className="border rounded-lg p-3 bg-muted/30 space-y-1">
            <p className="font-medium flex items-center gap-1">
              <Target className="size-3.5" />
              Suggested milestone targets
            </p>
            <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
              <li>Week 4 — Module 1–4 complete, first project started</li>
              <li>Week 8 — Modules 5–8 complete, Project 1 shipped</li>
              <li>Week 12 — Modules 9–12 complete, Projects 2–3 shipped</li>
              <li>Week 16 — All modules done, Capstone in progress</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pb-4">
        <Link href="/curriculum">
          <Button>
            Start Module 1 →
          </Button>
        </Link>
      </div>
    </div>
  )
}

// Local icon imports to avoid issues
function LayoutGrid({ className }: { className?: string }) {
  return <BookOpen className={className} />
}

function StickyNote({ className }: { className?: string }) {
  return <FolderKanban className={className} />
}
