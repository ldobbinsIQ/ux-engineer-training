"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { SearchEntry } from "@/types/content"

interface SearchBarProps {
  index: SearchEntry[]
}

export function SearchBar({ index }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const results = query.trim().length < 2
    ? []
    : index
        .filter((e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.description?.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  function handleSelect(href: string) {
    setQuery("")
    setOpen(false)
    router.push(href)
  }

  return (
    <div ref={ref} className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
        <Input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="Search lessons and projects…"
          className="pl-8 pr-8 h-8 text-sm"
          aria-label="Search curriculum"
          aria-expanded={open && results.length > 0}
          aria-autocomplete="list"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false) }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <ul
          role="listbox"
          className="absolute top-full mt-1 left-0 right-0 z-50 rounded-lg border bg-popover shadow-lg overflow-hidden"
        >
          {results.map((r) => (
            <li key={r.href} role="option">
              <button
                onClick={() => handleSelect(r.href)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors flex items-center gap-2"
              >
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0",
                    r.type === "module" && "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
                    r.type === "lesson" && "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
                    r.type === "project" && "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                  )}
                >
                  {r.type}
                </span>
                <span className="truncate">{r.title}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
