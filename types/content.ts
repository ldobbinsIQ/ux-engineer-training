export interface YouTubeResource {
  url: string
  label: string
}

export interface DocsResource {
  url: string
  label: string
}

export interface LessonResources {
  youtube: YouTubeResource[]
  docs: DocsResource[]
}

export interface LessonFrontmatter {
  title: string
  slug: string
  moduleSlug: string
  order: number
  hiringSignal: boolean
  hiringSignalCategory?: string
  estimatedHours: number
  tasks: string[]
  resources: LessonResources
}

export interface Lesson extends LessonFrontmatter {
  content: string
}

export interface ModuleFrontmatter {
  title: string
  slug: string
  order: number
  hiringSignal: boolean
  hiringSignalCategory?: string
  description: string
  estimatedHours: number
  deliverable: string
}

export interface Module extends ModuleFrontmatter {
  lessons: LessonFrontmatter[]
  content: string
}

export interface ProjectFrontmatter {
  title: string
  slug: string
  order: number
  hiringSignal: boolean
  hiringSignalCategory?: string
  estimatedHours: number
  deliverables: string[]
  isCapstone?: boolean
}

export interface Project extends ProjectFrontmatter {
  content: string
}

export type HiringSignalCategory =
  | "React + TypeScript"
  | "Accessibility"
  | "Design Systems"
  | "Prototyping + Polish"
  | "Data-Dense UI"
  | "AI Interface Patterns"

export interface SearchEntry {
  type: "lesson" | "module" | "project"
  title: string
  description?: string
  moduleSlug?: string
  lessonSlug?: string
  projectSlug?: string
  href: string
  hiringSignal: boolean
  hiringSignalCategory?: string
}
