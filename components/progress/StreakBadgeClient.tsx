"use client"

import { useProgress } from "@/hooks/useProgress"
import { StreakBadge } from "./StreakBadge"

export function StreakBadgeClient() {
  const { progress } = useProgress()
  return <StreakBadge streak={progress?.streak ?? 0} size="lg" />
}
