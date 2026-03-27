"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import type { GlossaryTerm } from "@/lib/glossary"

const categoryColors: Record<string, string> = {
  html: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  css: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  javascript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  typescript: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  react: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  nextjs: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  accessibility: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "design-systems": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  testing: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  general: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
}

interface Props {
  terms: GlossaryTerm[]
  categories: ReadonlyArray<{ value: string; label: string }>
}

export function GlossaryClient({ terms, categories }: Props) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return terms.filter((t) => {
      const matchesSearch =
        !q ||
        t.term.toLowerCase().includes(q) ||
        (t.expansion ?? "").toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
      const matchesCategory = activeCategory === "all" || t.category === activeCategory
      return matchesSearch && matchesCategory
    }).sort((a, b) => a.term.localeCompare(b.term))
  }, [terms, search, activeCategory])

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search terms, acronyms, definitions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Search glossary"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              activeCategory === cat.value
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            aria-pressed={activeCategory === cat.value}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "term" : "terms"}
      </p>

      {/* Terms list */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No terms match your search.
        </div>
      ) : (
        <dl className="space-y-3">
          {filtered.map((t) => (
            <div
              key={t.term}
              className="rounded-xl border bg-card p-4"
            >
              <div className="flex items-start gap-3 flex-wrap">
                <dt className="flex-1 min-w-0">
                  <span className="text-base font-bold text-foreground">{t.term}</span>
                  {t.expansion && (
                    <span className="ml-2 text-sm text-muted-foreground font-normal">
                      ({t.expansion})
                    </span>
                  )}
                </dt>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                    categoryColors[t.category] ?? categoryColors.general
                  }`}
                >
                  {t.category}
                </span>
              </div>
              <dd className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t.definition}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
