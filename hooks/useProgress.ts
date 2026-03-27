"use client"

import { useState, useEffect, useCallback } from "react"
import {
  getProgress,
  saveProgress,
  toggleTask as toggleTaskLib,
  toggleProjectComplete as toggleProjectLib,
  saveNote as saveNoteLib,
  exportProgress,
  importProgress,
  resetProgress,
  type ProgressData,
} from "@/lib/progress"

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData | null>(null)

  useEffect(() => {
    setProgress(getProgress())
  }, [])

  const toggleTask = useCallback(
    (
      lessonSlug: string,
      taskIndex: number,
      totalTasks: number,
      moduleSlug: string,
      allLessons: { slug: string; tasks: string[] }[]
    ) => {
      const updated = toggleTaskLib(lessonSlug, taskIndex, totalTasks, moduleSlug, allLessons)
      setProgress(updated)
    },
    []
  )

  const toggleProject = useCallback((projectSlug: string) => {
    const updated = toggleProjectLib(projectSlug)
    setProgress(updated)
  }, [])

  const saveNote = useCallback((lessonSlug: string, note: string) => {
    const updated = saveNoteLib(lessonSlug, note)
    setProgress(updated)
  }, [])

  const doExport = useCallback(() => {
    exportProgress()
  }, [])

  const doImport = useCallback((json: string) => {
    const result = importProgress(json)
    if (result) setProgress(result)
    return result !== null
  }, [])

  const doReset = useCallback(() => {
    resetProgress()
    setProgress(getProgress())
  }, [])

  const isTaskComplete = useCallback(
    (lessonSlug: string, taskIndex: number) => {
      if (!progress) return false
      return !!progress.completedTasks[`${lessonSlug}__${taskIndex}`]
    },
    [progress]
  )

  const isLessonComplete = useCallback(
    (lessonSlug: string) => {
      if (!progress) return false
      return !!progress.completedLessons[lessonSlug]
    },
    [progress]
  )

  const isModuleComplete = useCallback(
    (moduleSlug: string) => {
      if (!progress) return false
      return !!progress.completedModules[moduleSlug]
    },
    [progress]
  )

  const isProjectComplete = useCallback(
    (projectSlug: string) => {
      if (!progress) return false
      return !!progress.completedProjects[projectSlug]
    },
    [progress]
  )

  const getNote = useCallback(
    (lessonSlug: string) => {
      if (!progress) return ""
      return progress.notes[lessonSlug] ?? ""
    },
    [progress]
  )

  return {
    progress,
    toggleTask,
    toggleProject,
    saveNote,
    doExport,
    doImport,
    doReset,
    isTaskComplete,
    isLessonComplete,
    isModuleComplete,
    isProjectComplete,
    getNote,
  }
}
