"use client"

import { useRef, useState } from "react"
import { useProgress } from "@/hooks/useProgress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Download, Upload, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react"

export function SettingsPageClient() {
  const { doExport, doImport, doReset } = useProgress()
  const fileRef = useRef<HTMLInputElement>(null)
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle")
  const [resetConfirm, setResetConfirm] = useState(false)

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      const ok = doImport(text)
      setImportStatus(ok ? "success" : "error")
      setTimeout(() => setImportStatus("idle"), 3000)
    }
    reader.readAsText(file)
    if (fileRef.current) fileRef.current.value = ""
  }

  return (
    <div className="space-y-4">
      {/* Export */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Export Progress</CardTitle>
          <CardDescription>
            Download your progress as a JSON file. Use this to back up your data or transfer it to
            another device.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={doExport} variant="outline" size="sm" className="gap-2">
            <Download className="size-4" />
            Download progress.json
          </Button>
        </CardContent>
      </Card>

      {/* Import */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Import Progress</CardTitle>
          <CardDescription>
            Upload a previously exported JSON file to restore your progress. This will overwrite
            your current progress.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={() => fileRef.current?.click()}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Upload className="size-4" />
            Choose file to import
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
            aria-label="Import progress JSON"
          />
          {importStatus === "success" && (
            <p className="flex items-center gap-1.5 text-sm text-green-600">
              <CheckCircle2 className="size-4" />
              Progress imported successfully.
            </p>
          )}
          {importStatus === "error" && (
            <p className="flex items-center gap-1.5 text-sm text-destructive">
              <AlertTriangle className="size-4" />
              Invalid file. Make sure it&apos;s a valid progress JSON.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Reset */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-base text-destructive">Reset All Progress</CardTitle>
          <CardDescription>
            Permanently delete all your progress, notes, and streak data. This cannot be undone.
            Export first if you want a backup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!resetConfirm ? (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-destructive/50 text-destructive hover:bg-destructive/10"
              onClick={() => setResetConfirm(true)}
            >
              <Trash2 className="size-4" />
              Reset progress
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <AlertTriangle className="size-4 text-amber-500 shrink-0" />
                Are you sure? This will delete everything.
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    doReset()
                    setResetConfirm(false)
                  }}
                >
                  Yes, reset everything
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setResetConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
