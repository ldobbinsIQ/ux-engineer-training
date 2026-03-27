import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type {
  Module,
  ModuleFrontmatter,
  Lesson,
  LessonFrontmatter,
  Project,
  ProjectFrontmatter,
  SearchEntry,
} from "@/types/content"

const CONTENT_DIR = path.join(process.cwd(), "content")
const MODULES_DIR = path.join(CONTENT_DIR, "modules")
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects")

// ─── Modules ─────────────────────────────────────────────────────────────────

export function getModules(): Module[] {
  const moduleDirs = fs
    .readdirSync(MODULES_DIR)
    .filter((d) => fs.statSync(path.join(MODULES_DIR, d)).isDirectory())
    .sort()

  return moduleDirs.map((dir) => {
    const indexPath = path.join(MODULES_DIR, dir, "index.mdx")
    const raw = fs.readFileSync(indexPath, "utf-8")
    const { data, content } = matter(raw)
    const lessons = getLessons(dir)
    return {
      ...(data as ModuleFrontmatter),
      slug: dir,
      content,
      lessons,
    }
  })
}

export function getModule(slug: string): Module | null {
  const modulePath = path.join(MODULES_DIR, slug)
  if (!fs.existsSync(modulePath)) return null

  const indexPath = path.join(modulePath, "index.mdx")
  const raw = fs.readFileSync(indexPath, "utf-8")
  const { data, content } = matter(raw)
  const lessons = getLessons(slug)
  return {
    ...(data as ModuleFrontmatter),
    slug,
    content,
    lessons,
  }
}

// ─── Lessons ──────────────────────────────────────────────────────────────────

export function getLessons(moduleSlug: string): LessonFrontmatter[] {
  const moduleDir = path.join(MODULES_DIR, moduleSlug)
  const files = fs
    .readdirSync(moduleDir)
    .filter((f) => f.endsWith(".mdx") && f !== "index.mdx")
    .sort()

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(moduleDir, file), "utf-8")
    const { data } = matter(raw)
    const slug = file.replace(/\.mdx$/, "")
    return { ...(data as LessonFrontmatter), slug, moduleSlug }
  })
}

export function getLesson(
  moduleSlug: string,
  lessonSlug: string
): Lesson | null {
  const filePath = path.join(MODULES_DIR, moduleSlug, `${lessonSlug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return { ...(data as LessonFrontmatter), slug: lessonSlug, moduleSlug, content }
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export function getProjects(): Project[] {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort()

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8")
    const { data, content } = matter(raw)
    const slug = file.replace(/\.mdx$/, "")
    return { ...(data as ProjectFrontmatter), slug, content }
  })
}

export function getProject(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return { ...(data as ProjectFrontmatter), slug, content }
}

// ─── Search Index ─────────────────────────────────────────────────────────────

export function getSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = []

  const modules = getModules()
  for (const mod of modules) {
    entries.push({
      type: "module",
      title: mod.title,
      description: mod.description,
      moduleSlug: mod.slug,
      href: `/curriculum/${mod.slug}`,
      hiringSignal: mod.hiringSignal,
      hiringSignalCategory: mod.hiringSignalCategory,
    })
    for (const lesson of mod.lessons) {
      entries.push({
        type: "lesson",
        title: lesson.title,
        moduleSlug: mod.slug,
        lessonSlug: lesson.slug,
        href: `/curriculum/${mod.slug}/${lesson.slug}`,
        hiringSignal: lesson.hiringSignal,
        hiringSignalCategory: lesson.hiringSignalCategory,
      })
    }
  }

  const projects = getProjects()
  for (const proj of projects) {
    entries.push({
      type: "project",
      title: proj.title,
      projectSlug: proj.slug,
      href: `/projects/${proj.slug}`,
      hiringSignal: proj.hiringSignal,
      hiringSignalCategory: proj.hiringSignalCategory,
    })
  }

  return entries
}
