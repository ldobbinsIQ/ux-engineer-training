# UX Engineer Training — South Bay Track

A fully local, self-contained training app for UX professionals upskilling into UX Engineering. Covers HTML/CSS foundations through React, Next.js, accessibility, design systems, data-dense UI, AI interfaces, testing, and portfolio readiness.

## Prerequisites

- **Node.js** 18+ — [nodejs.org](https://nodejs.org)
- **npm** (bundled with Node) or **pnpm** (`npm install -g pnpm`)

## Install and Run

```bash
cd ux-engineer-training
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
ux-engineer-training/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Dashboard (streak, progress, today's tasks)
│   ├── start/              # Onboarding / Start Here
│   ├── curriculum/         # Module and lesson pages
│   ├── projects/           # Project brief pages
│   ├── progress/           # Analytics and history
│   ├── notes/              # All notes overview
│   └── settings/           # Export / Import / Reset
├── components/             # React components
│   ├── layout/             # Sidebar, TopBar, MobileNav
│   ├── curriculum/         # ModuleCard, LessonCard, HiringSignalBadge
│   ├── lesson/             # TaskChecklist, LessonNotes, ResourceLinks
│   ├── progress/           # ProgressRing, StreakBadge, TodayTasks
│   ├── search/             # SearchBar
│   └── settings/           # SettingsPageClient
├── content/
│   ├── modules/            # 14 module folders, each with index.mdx + lesson files
│   └── projects/           # 5 project brief MDX files
├── hooks/
│   └── useProgress.ts      # React hook for all localStorage progress state
├── lib/
│   ├── content.ts          # File system MDX loader (server-side)
│   └── progress.ts         # localStorage helpers and types
└── types/
    └── content.ts          # TypeScript interfaces for Module, Lesson, Project
```

## Curriculum Overview

14 modules, ~58 lessons, 5 projects:

| # | Module | Hours |
|---|--------|-------|
| 1 | Workflow and Delivery Habits | 6 |
| 2 | HTML Forms and Semantic Markup | 6 |
| 3 | CSS and Design Systems | 8 |
| 4 | JavaScript UI Behavior | 6 |
| 5 | TypeScript for UI Engineers | 6 |
| 6 | React Fundamentals | 10 |
| 7 | Next.js Fundamentals | 8 |
| 8 | Accessibility Engineering | 10 |
| 9 | Design Systems in Code | 10 |
| 10 | Prototyping and Polish | 10 |
| 11 | Data-Dense Enterprise UI | 12 |
| 12 | AI Interface Patterns | 10 |
| 13 | Testing and Quality | 8 |
| 14 | Portfolio Readiness | 6 |

**Projects:**
1. Figma to Code Fidelity: Enterprise Settings Page (8 hrs)
2. Mini Design System (12 hrs)
3. Data Dashboard (10 hrs)
4. AI Assistant UI (10 hrs)
5. Capstone: UX Engineer Portfolio Case Study Builder (40 hrs)

## How Progress Works

All progress is stored in your browser's `localStorage` — no account, no server, no data leaves your machine.

**What's tracked:**
- Individual task checkboxes (per lesson)
- Lesson completion
- Module completion
- Project completion
- Per-lesson notes (auto-saved with 800ms debounce)
- Daily streak (increments when you check a task on a new calendar day)

**Export / Import / Reset** — go to `/settings` to:
- Download your progress as a JSON file (backup or move between machines)
- Import a previously exported JSON file
- Reset all progress to start fresh

## How to Add a New Lesson

1. Create a new `.mdx` file in the appropriate module folder, e.g. `content/modules/01-workflow/04-new-lesson.mdx`
2. Add frontmatter matching this schema:

```yaml
---
title: "Your Lesson Title"
slug: "04-new-lesson"
moduleSlug: "01-workflow"
order: 4
hiringSignal: false
estimatedHours: 2
tasks:
  - "First task description"
  - "Second task description"
resources:
  youtube:
    - url: "https://www.youtube.com/results?search_query=your+topic"
      label: "Label for the link"
  docs:
    - url: "https://example.com/docs"
      label: "Documentation link"
---

Your lesson content in Markdown/MDX here.
```

3. The lesson will automatically appear in the curriculum — no code changes needed.

## How to Add a New Module

1. Create a new folder: `content/modules/15-new-module/`
2. Create `content/modules/15-new-module/index.mdx` with this frontmatter:

```yaml
---
title: "Your Module Title"
slug: "15-new-module"
order: 15
hiringSignal: false
description: "What this module covers."
estimatedHours: 8
deliverable: "Description of the final deliverable"
---

Optional module overview content in MDX.
```

3. Add lesson files following the lesson schema above.

## Hiring Signal Labels

Six categories mark lessons and projects with real employer value signals. Shown as amber badges throughout the app:

- **React + TypeScript** — modern component patterns employers test for
- **Accessibility** — WCAG compliance, screen reader testing, keyboard nav
- **Design Systems** — token systems, component APIs, theming
- **Prototyping + Polish** — micro-animations, edge cases, production readiness
- **Data-Dense UI** — sortable tables, filters, pagination, bulk operations
- **AI Interface Patterns** — streaming responses, chat UI, loading states

## Tech Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for UI primitives
- **next-mdx-remote** for MDX rendering
- **gray-matter** for frontmatter parsing
- **lucide-react** for icons
- No database, no API keys, no backend
