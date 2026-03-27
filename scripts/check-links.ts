/**
 * check-links.ts
 * Run with: npm run check:links
 *
 * Scans all MDX files for resource URLs (frontmatter) and validates:
 *  - Internal links map to real routes (no 404)
 *  - External links are syntactically valid
 *  - If online, optionally HEAD-checks external URLs (fails gracefully offline)
 */

import fs from "fs"
import path from "path"
import matter from "gray-matter"

const MODULES_DIR = path.join(process.cwd(), "content", "modules")
const PROJECTS_DIR = path.join(process.cwd(), "content", "projects")

// Known valid internal route prefixes
const VALID_INTERNAL_ROUTES = [
  "/curriculum",
  "/projects",
  "/progress",
  "/notes",
  "/settings",
  "/start",
  "/glossary",
]

interface Issue {
  file: string
  url: string
  label: string
  reason: string
}

const issues: Issue[] = []
const allUrls: { file: string; url: string; label: string }[] = []

function collectMdxFiles(dir: string): string[] {
  const results: string[] = []
  if (!fs.existsSync(dir)) return results
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...collectMdxFiles(fullPath))
    } else if (entry.name.endsWith(".mdx")) {
      results.push(fullPath)
    }
  }
  return results
}

function extractUrls(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data } = matter(raw)
  const resources = data.resources as
    | { youtube?: { url: string; label: string }[]; docs?: { url: string; label: string }[] }
    | undefined

  if (!resources) return

  const rel = path.relative(process.cwd(), filePath)

  for (const r of resources.youtube ?? []) {
    allUrls.push({ file: rel, url: r.url, label: r.label })
  }
  for (const r of resources.docs ?? []) {
    allUrls.push({ file: rel, url: r.url, label: r.label })
  }
}

function validateUrl(file: string, url: string, label: string) {
  // Check internal links
  if (url.startsWith("/")) {
    const isValid = VALID_INTERNAL_ROUTES.some((prefix) => url.startsWith(prefix))
    if (!isValid) {
      issues.push({ file, url, label, reason: "Internal link does not match any known route" })
    }
    return
  }

  // Check URL is syntactically valid
  try {
    const parsed = new URL(url)
    if (!["http:", "https:"].includes(parsed.protocol)) {
      issues.push({ file, url, label, reason: `Invalid protocol: ${parsed.protocol}` })
    }
  } catch {
    issues.push({ file, url, label, reason: "Malformed URL (failed URL parse)" })
  }
}

async function checkExternal(
  file: string,
  url: string,
  label: string
): Promise<void> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: { "User-Agent": "ux-engineer-training/link-checker" },
    })
    clearTimeout(timeout)
    if (res.status >= 400) {
      issues.push({ file, url, label, reason: `HTTP ${res.status}` })
    }
  } catch {
    // Offline or timeout — don't fail
  }
}

async function main() {
  const mdxFiles = [
    ...collectMdxFiles(MODULES_DIR),
    ...collectMdxFiles(PROJECTS_DIR),
  ]

  console.log(`\n🔍 Scanning ${mdxFiles.length} MDX files for resource links...\n`)

  for (const f of mdxFiles) {
    extractUrls(f)
  }

  console.log(`📋 Found ${allUrls.length} resource URLs\n`)

  // Validate all URLs
  for (const { file, url, label } of allUrls) {
    validateUrl(file, url, label)
  }

  // Optionally HEAD-check external URLs if online flag passed
  if (process.argv.includes("--check-external")) {
    console.log("🌐 HEAD-checking external URLs (this may take a moment)...\n")
    const external = allUrls.filter((u) => u.url.startsWith("http"))
    await Promise.allSettled(
      external.map(({ file, url, label }) => checkExternal(file, url, label))
    )
  }

  if (issues.length === 0) {
    console.log("✅ No link issues found.\n")
  } else {
    console.log(`⚠️  Found ${issues.length} issue(s):\n`)
    for (const issue of issues) {
      console.log(`  FILE: ${issue.file}`)
      console.log(`  URL:  ${issue.url}`)
      console.log(`  LABEL: ${issue.label}`)
      console.log(`  REASON: ${issue.reason}`)
      console.log("")
    }
    process.exit(1)
  }
}

main().catch((err) => {
  console.error("check-links failed:", err)
  process.exit(1)
})
