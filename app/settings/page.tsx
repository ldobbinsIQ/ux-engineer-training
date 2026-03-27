import { SettingsPageClient } from "@/components/settings/SettingsPageClient"

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your progress data.</p>
      </div>
      <SettingsPageClient />
    </div>
  )
}
