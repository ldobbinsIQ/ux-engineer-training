import { ReactNode } from "react"

interface TopBarProps {
  breadcrumb?: ReactNode
  actions?: ReactNode
}

export function TopBar({ breadcrumb, actions }: TopBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur sticky top-0 z-30">
      <div className="text-sm text-muted-foreground">{breadcrumb}</div>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  )
}
