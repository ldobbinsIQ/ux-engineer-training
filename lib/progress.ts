export interface ProgressData {
  completedTasks: Record<string, boolean>
  completedLessons: Record<string, boolean>
  completedModules: Record<string, boolean>
  completedProjects: Record<string, boolean>
  notes: Record<string, string>
  streak: number
  lastActiveDateISO: string
  history: string[]
}

const STORAGE_KEY = "uxe-training-progress"

const DEFAULT_PROGRESS: ProgressData = {
  completedTasks: {},
  completedLessons: {},
  completedModules: {},
  completedProjects: {},
  notes: {},
  streak: 0,
  lastActiveDateISO: "",
  history: [],
}

export function taskKey(lessonSlug: string, taskIndex: number): string {
  return `${lessonSlug}__${taskIndex}`
}

export function getProgress(): ProgressData {
  if (typeof window === "undefined") return { ...DEFAULT_PROGRESS }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_PROGRESS }
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_PROGRESS }
  }
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function updateStreak(data: ProgressData): ProgressData {
  const today = todayISO()
  if (data.lastActiveDateISO === today) return data

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayISO = yesterday.toISOString().slice(0, 10)

  const newStreak =
    data.lastActiveDateISO === yesterdayISO ? data.streak + 1 : 1

  const history = data.history.includes(today)
    ? data.history
    : [...data.history, today]

  return { ...data, streak: newStreak, lastActiveDateISO: today, history }
}

export function toggleTask(
  lessonSlug: string,
  taskIndex: number,
  totalTasks: number,
  moduleSlug: string,
  allLessons: { slug: string; tasks: string[] }[]
): ProgressData {
  const data = getProgress()
  const key = taskKey(lessonSlug, taskIndex)
  const newCompleted = { ...data.completedTasks, [key]: !data.completedTasks[key] }

  // Check if lesson is complete
  const lessonComplete = Array.from({ length: totalTasks }, (_, i) =>
    taskKey(lessonSlug, i)
  ).every((k) => newCompleted[k])
  const completedLessons = { ...data.completedLessons, [lessonSlug]: lessonComplete }

  // Check if module is complete
  const moduleComplete = allLessons.every((l) => completedLessons[l.slug])
  const completedModules = { ...data.completedModules, [moduleSlug]: moduleComplete }

  let updated: ProgressData = {
    ...data,
    completedTasks: newCompleted,
    completedLessons,
    completedModules,
  }

  if (newCompleted[key]) {
    updated = updateStreak(updated)
  }

  saveProgress(updated)
  return updated
}

export function toggleProjectComplete(projectSlug: string): ProgressData {
  const data = getProgress()
  const newVal = !data.completedProjects[projectSlug]
  const updated: ProgressData = {
    ...data,
    completedProjects: { ...data.completedProjects, [projectSlug]: newVal },
  }
  if (newVal) updateStreak(updated)
  saveProgress(updated)
  return updated
}

export function saveNote(lessonSlug: string, note: string): ProgressData {
  const data = getProgress()
  const updated: ProgressData = {
    ...data,
    notes: { ...data.notes, [lessonSlug]: note },
  }
  saveProgress(updated)
  return updated
}

export function exportProgress(): void {
  const data = getProgress()
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `uxe-progress-${todayISO()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importProgress(json: string): ProgressData | null {
  try {
    const parsed = JSON.parse(json)
    const merged = { ...DEFAULT_PROGRESS, ...parsed }
    saveProgress(merged)
    return merged
  } catch {
    return null
  }
}

export function resetProgress(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}

export function getCompletionStats(data: ProgressData, modules: { slug: string; lessons: { slug: string; tasks: string[] }[] }[]): {
  totalTasks: number
  completedTasksCount: number
  totalLessons: number
  completedLessonsCount: number
  totalModules: number
  completedModulesCount: number
  overallPercent: number
  modulePercents: Record<string, number>
} {
  let totalTasks = 0
  let completedTasksCount = 0
  let totalLessons = 0
  let completedLessonsCount = 0
  const modulePercents: Record<string, number> = {}

  for (const mod of modules) {
    let modCompleted = 0
    for (const lesson of mod.lessons) {
      totalLessons++
      if (data.completedLessons[lesson.slug]) completedLessonsCount++
      for (let i = 0; i < lesson.tasks.length; i++) {
        totalTasks++
        if (data.completedTasks[taskKey(lesson.slug, i)]) {
          completedTasksCount++
          modCompleted++
        }
      }
    }
    const modTotal = mod.lessons.reduce((s, l) => s + l.tasks.length, 0)
    modulePercents[mod.slug] = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0
  }

  const overallPercent = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0

  return {
    totalTasks,
    completedTasksCount,
    totalLessons,
    completedLessonsCount,
    totalModules: modules.length,
    completedModulesCount: modules.filter((m) => data.completedModules[m.slug]).length,
    overallPercent,
    modulePercents,
  }
}
